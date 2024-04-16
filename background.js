// This function will fetch the conversion rate for the provided currency code
function getConversionRate(apiKey, fromCurrency, toCurrency, callback) {
    // Convert both currency codes to uppercase to ensure they match the API format
    const upperFromCurrency = fromCurrency.toUpperCase();
    const upperToCurrency = toCurrency.toUpperCase();
  
    const requestUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${upperFromCurrency}`;
  
    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        const rate = data.conversion_rates[upperToCurrency];
        if (rate) {
          callback(null, rate);
        } else {
          callback(new Error('Conversion rate not found.'), null);
        }
      })
      .catch(error => callback(error, null));
  }
  
  // This function will be called when the user submits their currency choices
  function convertCurrency() {
    // Retrieve the user's 'From' and 'To' currency choices
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    // Your API key (user input if required)
    const apiKey = 'b3e63b774929d44486c735f7';
  
    getConversionRate(apiKey, fromCurrency, toCurrency, (error, rate) => {
      if (error) {
        console.error('Error fetching conversion rate:', error);
        document.getElementById('result').textContent = 'Error fetching conversion rate.';
      } else {
        // Output the conversion rate result
        document.getElementById('result').textContent = `1 ${fromCurrency.toUpperCase()} = ${rate} ${toCurrency.toUpperCase()}`;
      }
    });
  }

  
  document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit'); 
    submitButton.addEventListener('click', convertCurrency);
  });

