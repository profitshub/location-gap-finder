// src/components/LocationDetector.js
import React, { useState, useEffect } from 'react';

function LocationDetector({ onLocationDetected }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
        if (onLocationDetected) {
          onLocationDetected({ latitude, longitude });
        }
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [onLocationDetected]);

  return (
    
      {loading ? (
        Detecting your location...
      ) : error ? (
        {error}
      ) : (
        
          Location detected:
          Latitude: {location.latitude.toFixed(6)}
          Longitude: {location.longitude.toFixed(6)}
        
      )}
    
  );
}

export default LocationDetector;
```