// src/components/LocationDetector.js
import React, { useState, useEffect, useCallback } from 'react';

function LocationDetector({ onLocationDetected }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stabilize location detection callbacks
  const handleSuccess = useCallback((position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    setLoading(false);
    if (onLocationDetected) {
      onLocationDetected({ latitude, longitude });
    }
  }, [onLocationDetected]);

  const handleError = useCallback((error) => {
    setError(`Error: ${error.message}`);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [handleSuccess, handleError]); // Only depend on stable callback references

  const testLocation = async () => {
    // Test coordinates (example: New York City)
    const testCoords = { latitude: 40.7128, longitude: -74.0060 };
    setLocation(testCoords);
    setLoading(false);
    if (onLocationDetected) {
      onLocationDetected(testCoords);
    }
  };

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