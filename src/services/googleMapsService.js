// src/services/googleMapsService.js
// Add proper API key management and error handling
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  throw new Error('Google Maps API key is missing');
}

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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&result_type=street_address|premise`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }

    const data = await response.json();
    console.log('Geocoding response:', data); // Debug info
    
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      throw new Error('No address found');
    }

    // Find the most precise address
    const address = data.results.find(result => 
      result.types.includes('street_address') || 
      result.types.includes('premise')
    )?.formatted_address || data.results[0].formatted_address;

    console.log('Selected address:', address); // Debug info
    return address;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Could not retrieve address');
  }
}
