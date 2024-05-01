// This function will fetch the conversion rate for the provided currency code
function getConversionRate(apiKey, fromCurrency, toCurrency, callback) {
  // Convert both currency codes to uppercase to ensure they match the API format
  const upperFromCurrency = fromCurrency.toUpperCase();
  const upperToCurrency = toCurrency.toUpperCase();

  const requestUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${upperFromCurrency}`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[upperToCurrency];
      if (rate) {
        callback(null, rate);
      } else {
        callback(new Error("Conversion rate not found."), null);
      }
    })
    .catch((error) => callback(error, null));
}

// This function will be called when the user submits their currency choices
function convertCurrency() {
  // Retrieve the user's 'From' and 'To' currency choices
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  // Your API key (user input if required)
  const apiKey = "b3e63b774929d44486c735f7";

  getConversionRate(apiKey, fromCurrency, toCurrency, (error, rate) => {
    if (error) {
      console.error("Error fetching conversion rate:", error);
      document.getElementById("result").textContent =
        "Error fetching conversion rate.";
    } else {
      // Output the conversion rate result
      chrome.storage.local.set({ conversionRate: rate }, () => {
        console.log(
          `Conversion rate for ${upperFromCurrency} to ${upperToCurrency} stored successfully.`
        );
      });
      document.getElementById(
        "result"
      ).textContent = `1 ${fromCurrency.toUpperCase()} = ${rate} ${toCurrency.toUpperCase()}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    convertCurrency();
    displayPriceRange();
    displaySortedPrices();
  });
});

function displayPriceRange() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "getPrices" },
      function (response) {
        const priceRange = document.getElementById("priceRange");

        if (response && response.prices && response.prices.length > 0) {
          const prices = response.prices;

          const minPrice = prices[0];
          const maxPrice = prices[prices.length - 1];

          chrome.storage.local.get(["conversionRate"], function (result) {
            const toCurrency = document.getElementById("toCurrency").value;
            if (result.conversionRate) {
              const convertedMin = (minPrice * result.conversionRate).toFixed(
                2
              );
              const convertedMax = (maxPrice * result.conversionRate).toFixed(
                2
              );

              priceRange.textContent = `${convertedMin} - ${convertedMax} in ${toCurrency.toUpperCase()}`;
            } else {
              priceRange.textContent = "Conversion rate not available.";
            }
          });
        } else {
          priceRange.textContent = "No prices found.";
        }
      }
    );
  });
}

function displaySortedPrices() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "getPrices" },
      function (response) {
        const priceListElement = document.getElementById("priceList");

        if (response && response.prices) {
          chrome.storage.local.get(["conversionRate"], function (result) {
            if (result.conversionRate) {
              const conversionRate =
                Math.round(result.conversionRate * 100) / 100;

              const prices = response.prices.map(
                (price) =>
                  Math.round(parseFloat(price) * conversionRate * 100) / 100
              );

              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);

              const numRanges = Math.ceil(prices.length / 6);

              const rangeSize = (maxPrice - minPrice) / numRanges;
              const ranges = Array.from(
                { length: numRanges + 1 },
                (_, i) => minPrice + i * rangeSize
              );

              const rangeCounts = new Array(numRanges).fill(0);
              prices.forEach((price) => {
                const index = Math.min(
                  Math.floor((price - minPrice) / rangeSize),
                  numRanges - 1
                );
                rangeCounts[index]++;
              });

              // Setup canvas
              const canvas = document.getElementById("priceBoxPlot");
              const ctx = canvas.getContext("2d");

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const margin = 20; // Reduce margin for more space
              const plotWidth = canvas.width - 3 * margin;
              const plotHeight = canvas.height - 2 * margin;

              const barWidth = plotWidth / numRanges - 6; // 6px spacing

              const maxCount = Math.max(...rangeCounts);

              const countToY = (count) =>
                margin + plotHeight * (1 - count / maxCount);

              // Draw bars
              ctx.fillStyle = "#3c9bd9";
              rangeCounts.forEach((count, i) => {
                const barLeft = margin + i * (barWidth + 6); // Include spacing
                const barTop = countToY(count);
                const barHeight = plotHeight - (barTop - margin);

                ctx.fillRect(barLeft, barTop, barWidth, barHeight);
              });

              // Draw axis lines
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = "#555";
              ctx.beginPath();
              ctx.moveTo(margin, plotHeight + margin);
              ctx.lineTo(canvas.width - margin, plotHeight + margin);
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(margin, margin);
              ctx.lineTo(margin, canvas.height - margin);
              ctx.stroke();

              // Label axes
              ctx.font = "8px Arial";
              ctx.fillStyle = "#000";

              // Label x-axis ranges
              ranges.forEach((range, i) => {
                const labelX = margin + i * (barWidth + 6); // Include spacing
                ctx.fillText(
                  range.toFixed(2),
                  labelX,
                  plotHeight + margin + 20
                );
              });

              ctx.fillText(
                "Price Ranges",
                margin + plotWidth / 2,
                canvas.height - 10
              );

              ctx.rotate(-Math.PI / 2);
              ctx.fillText("Frequency", -plotHeight / 2 - margin, 15);
              ctx.rotate(Math.PI / 2);
            } else {
              priceRange.textContent = "Conversion rate not available.";
            }
          });
        } else {
          priceListElement.textContent = "No prices found.";
        }
      }
    );
  });
}
