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
    if (/^[\$£€]?\d*\.?\d+$/.test(selectedText)) {
      // Extract just the numeric part if there's a leading symbol
      var numericPart = selectedText.replace(/^[^\d]+/, "");
      popup.textContent = numericPart;
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
