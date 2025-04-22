// src/services/googleMapsService.js
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export async function checkForExistingBusinesses(latitude, longitude, radius = 50) {
  try {
    // Note: In a real implementation, you would need a proxy server to hide your API key
    // For MVP, we'll use a client-side approach, but this should be moved to a server later
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch nearby places');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error checking for businesses:', error);
    return [];
  }
}

export async function getAddressFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to reverse geocode');
    }
    
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    
    return 'Address not found';
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Error retrieving address';
  }
}
