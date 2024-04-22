// popup.js
let priceData = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updatePrices') {
    priceData = request.data;
    renderChart();
  }
});

function renderChart() {
  const ctx = document.getElementById('priceChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: priceData.map((_, index) => `Product ${index + 1}`),
      datasets: [
        {
          label: 'Price',
          data: priceData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.4, // Adjust the curve of the line
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}