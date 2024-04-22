// content-script.js
function getPricesFromPage() {
    const prices = [];
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
  
    const priceRegex = /\d+(\.\d+)?/g; // Regular expression to match prices
  
    let currentNode;
    while ((currentNode = treeWalker.nextNode())) {
      const nodeText = currentNode.textContent;
      const matches = nodeText.match(priceRegex);
  
      if (matches) {
        matches.forEach((match) => {
          const price = parseFloat(match);
          if (!isNaN(price)) {
            prices.push(price);
          }
        });
      }
    }
  
    return prices;
  }
  
  // Send the collected prices to the background script
  chrome.runtime.sendMessage({ action: 'prices', data: getPricesFromPage() });