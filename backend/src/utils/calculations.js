export const calculateProfit = (sellingPrice, purchaseRate) => {
  const sell = Number(sellingPrice) || 0;
  const buy = Number(purchaseRate) || 0;
  const profit = sell - buy;
  const margin = sell > 0 ? ((profit / sell) * 100).toFixed(2) : 0;
  return { profit, margin: Number(margin) };
};