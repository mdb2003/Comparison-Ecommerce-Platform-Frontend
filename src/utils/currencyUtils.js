/**
 * Currency conversion utilities
 */

// Exchange rates with INR as base currency
// These would ideally come from an API in a production app
export const exchangeRates = {
  INR: 1.00,    // Indian Rupee (base)
  USD: 0.012,   // US Dollar (1 INR = 0.012 USD)
  EUR: 0.011,   // Euro
  GBP: 0.0094,  // British Pound
  JPY: 1.80,    // Japanese Yen
  CAD: 0.016,   // Canadian Dollar
  AUD: 0.018,   // Australian Dollar
  CNY: 0.087,   // Chinese Yuan
  // Add more currencies as needed
};

/**
 * Convert price from one currency to another
 * @param {number} amount - The price amount to convert
 * @param {string} fromCurrency - Source currency code (e.g., 'INR')
 * @param {string} toCurrency - Target currency code (e.g., 'USD')
 * @returns {number} Converted price amount
 */
export const convertCurrency = (amount, fromCurrency = 'INR', toCurrency = 'INR') => {
  // If currencies are the same or amount is invalid, return the original amount
  if (fromCurrency === toCurrency || !amount || isNaN(amount)) {
    return amount;
  }
  
  // Check if we have exchange rates for both currencies
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    console.warn(`Exchange rate not available for ${fromCurrency} or ${toCurrency}`);
    return amount;
  }
  
  // Convert to INR first (our base currency), then to target currency
  const amountInINR = amount / exchangeRates[fromCurrency];
  const convertedAmount = amountInINR * exchangeRates[toCurrency];
  
  return convertedAmount;
};

/**
 * Get the currency symbol for a given currency code
 * @param {string} currencyCode - Currency code (e.g., 'USD')
 * @returns {string} Currency symbol (e.g., '$')
 */
export const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CNY: '¥'
  };
  
  return symbols[currencyCode] || currencyCode;
};

/**
 * Get exchange rate between two currencies
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {number} Exchange rate
 */
export const getExchangeRate = (fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) {
    return 1;
  }
  
  // Direct conversion using our exchange rates
  return exchangeRates[toCurrency] / exchangeRates[fromCurrency];
}; 