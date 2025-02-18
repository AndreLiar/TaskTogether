// src/utils/retry.js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a function that returns a Promise.
 * @param {Function} fn - The function to retry.
 * @param {number} retries - Number of retries.
 * @param {number} delay - Delay in milliseconds between retries.
 * @returns {Promise<*>} - Resolves with the function's result.
 */
async function retry(fn, retries = 5, delay = 1000) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`Retry ${i + 1} failed. Retrying in ${delay} ms...`, error);
      await wait(delay);
    }
  }
  throw lastError;
}

module.exports = retry;
