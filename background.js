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
        const priceList = document.getElementById("priceList");
        if (response && response.prices) {
          response.prices.forEach((price) => {
            let li = document.createElement("li");
            li.textContent = price;
            priceList.appendChild(li);
          });
        } else {
          priceList.textContent = "No prices found.";
        }
      }
    );
  });
}
