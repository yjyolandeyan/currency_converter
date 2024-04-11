// Function to fetch the exchange rate
function fetchExchangeRate(apiKey, fromCurrency, toCurrency, callback) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const rate = data.conversion_rates[toCurrency];
                if (rate) {
                    callback(null, rate);  // Successful retrieval of the rate
                } else {
                    callback(`Rate not found for ${toCurrency}`);
                }
            } else {
                callback(data["error-type"]);  // Error handling based on the API response
            }
        })
        .catch(error => callback(error.message));  // Network or other fetch errors
}

// Listening for messages from the popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.contentScriptQuery === "fetchCurrencyRate") {
            fetchExchangeRate("b3e63b774929d44486c735f7", request.fromCurrency, request.toCurrency, function(err, rate) {
                if (err) {
                    sendResponse({error: err});
                } else {
                    sendResponse({rate: rate});
                }
            });
            return true;  // Will respond asynchronously
        }
    }
);
