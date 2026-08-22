export const calculateProfit = (sellingPrice, purchaseRate) => {
  const sell = parseFloat(sellingPrice) || 0;
  const buy = parseFloat(purchaseRate) || 0;
  const profit = sell - buy;
  const margin = sell > 0 ? ((profit / sell) * 100).toFixed(2) : 0;
  return { profit, margin: parseFloat(margin) };
};

export const getMarginBadge = (margin) => {
  if (margin >= 15) return { label: 'High', color: 'success' };
  if (margin >= 8) return { label: 'Medium', color: 'warning' };
  return { label: 'Low', color: 'error' };
};