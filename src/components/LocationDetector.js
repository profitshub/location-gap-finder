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
    <div className="location-detector">
      {loading ? (
        <p>Detecting your location...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="location-info">
          <p>Location detected:</p>
          <p>Latitude: {location.latitude.toFixed(6)}</p>
          <p>Longitude: {location.longitude.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
}

export default LocationDetector;