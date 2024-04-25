document.addEventListener("mouseup", function (e) {
  var selection = window.getSelection();
  var selectedText = selection.toString().trim();
  var popup = document.getElementById("textHighlightPopup");

  if (selectedText.length > 0) {
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "textHighlightPopup";
      popup.style.position = "absolute";
      popup.style.background = "white";
      popup.style.border = "1px solid black";
      popup.style.padding = "5px";
      popup.style.borderRadius = "4px";
      popup.style.boxShadow = "0px 0px 8px rgba(0,0,0,0.3)";
      popup.style.zIndex = "2147483647"; // Ensures the popup is above all other content
      document.body.appendChild(popup);
    }

    // Check if the selection is a number (including decimals)
    if (/[\$£€]?\d{1,3}(?:,\d{3})*\.?\d*/.test(selectedText)) {
      // Remove any non-numeric characters except the decimal point for conversion calculation
      var numericPart = selectedText.replace(/[^\d.]/g, "");
      chrome.storage.local.get(["conversionRate"], function (result) {
        if (result.conversionRate) {
          var convertedValue = parseFloat(numericPart) * result.conversionRate;
          popup.textContent = `${convertedValue.toFixed(2)}`;
        } else {
          popup.textContent = "Conversion rate not available.";
        }
      });
    } else {
      popup.textContent = "Please select a price"; // Show this message if the selection is not a number
    }
    

    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    popup.style.display = "block";
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 5}px`; // Adjust 5px above the selection
  } else {
    if (popup) {
      popup.style.display = "none";
    }
  }
});

// Hide the popup when clicking anywhere on the page
document.addEventListener("mousedown", function (e) {
  var popup = document.getElementById("textHighlightPopup");
  if (popup && e.target !== popup) {
    popup.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", function () {
  var prices = [];
  document.querySelectorAll('body *').forEach(function(node) {
    if (node.childNodes.length === 1 && node.nodeType === Node.TEXT_NODE) {
      var regex = /[\$£€]?\d{1,3}(?:,\d{3})*\.?\d*/g;
      var matches = node.textContent.match(regex);
      if (matches) {
        matches.forEach(function(match) {
          var price = parseFloat(match.replace(/[\$,£,€]/g, '').replace(/,/g, ''));
          if (!isNaN(price)) {
            prices.push(price);
          }
        });
      }
    }
  });

  prices.sort((a, b) => a - b);

  chrome.storage.local.set({prices: prices}, function() {
    console.log("Prices sorted and stored.");
  });
});
