// src/utils/helpers.js

/**
 * Format a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Format a date to a readable string
   * @param {Date} date - The date to format
   * @returns {string} - Formatted date string
   */
  export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  
  /**
   * Calculate the distance between two geographic coordinates
   * @param {number} lat1 - Latitude of the first point
   * @param {number} lon1 - Longitude of the first point
   * @param {number} lat2 - Latitude of the second point
   * @param {number} lon2 - Longitude of the second point
   * @returns {number} - Distance in kilometers
   */
  export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  }
  
  /**
   * Convert degrees to radians
   * @param {number} deg - Degrees
   * @returns {number} - Radians
   */
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  /**
   * Extract city and state from an address string
   * @param {string} address - Full address string
   * @returns {object} - Object with city and state
   */
  export function extractLocationInfo(address) {
    const parts = address.split(',').map(part => part.trim());
    
    // This is a simplified version and may need to be adjusted based on address formats
    if (parts.length >= 3) {
      // Assuming format: "Street, City, State ZIP"
      const city = parts[1];
      const stateZip = parts[2].split(' ');
      const state = stateZip[0];
      
      return { city, state };
    }
    
    return { city: parts[0], state: '' };
  }
  
  /**
   * Generate a unique ID
   * @returns {string} - Unique ID
   */
  export function generateId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  /**
   * Store data in localStorage
   * @param {string} key - Key under which to store the data
   * @param {any} data - Data to store
   */
  export function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  /**
   * Retrieve data from localStorage
   * @param {string} key - Key from which to retrieve data
   * @returns {any} - Retrieved data
   */
  export function retrieveData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }