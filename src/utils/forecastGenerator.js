/**
 * Generates mock forecast array for the LSTM chart.
 * Replace with real API: GET /predict?crop=onion&mandi=Lasalgaon&days=21
 */
export const generateForecast = (base, pred, days) =>
  Array.from({ length: days }, (_, i) => ({
    day:   i === 0 ? "Now" : `D${i + 1}`,
    price: +(base + (i * (pred - base)) / days + Math.sin(i * 0.4) * 0.7).toFixed(2),
    upper: +(base + (i * (pred - base)) / days + 1.8 + Math.sin(i * 0.4) * 0.7).toFixed(2),
    lower: +(base + (i * (pred - base)) / days - 1.4 + Math.sin(i * 0.4) * 0.7).toFixed(2),
  }));

/**
 * Generates mock mandi bar data for comparison chart.
 * Replace with real API: GET /mandis?crop=onion&state=Maharashtra
 */
export const generateMandiBarData = (mandiNames, base, pred) =>
  mandiNames.slice(0, 4).map((name, i) => ({
    name     : name.split(" ")[0],
    today    : Math.round(base * 100 - i * 40),
    predicted: Math.round(pred * 100 - i * 50),
  }));
