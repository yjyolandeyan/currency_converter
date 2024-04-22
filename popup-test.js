// popup.test.js
const fs = require('fs');
const path = require('path');

describe('popup.js', () => {
  let priceData;

  beforeAll(() => {
    // Load the contents of popup.js
    const popupJsPath = path.join(__dirname, 'popup.js');
    const popupJsContent = fs.readFileSync(popupJsPath, 'utf8');

    // Create a mock chrome object
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: (callback) => {
            callback({ action: 'updatePrices', data: [10.99, 15.75, 22.5] });
          },
        },
      },
    };

    // Evaluate the contents of popup.js
    eval(popupJsContent);
  });

  it('should contain numbers in priceData', () => {
    expect(priceData.every(Number.isFinite)).toBe(true);
  });
});