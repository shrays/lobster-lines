'use client'

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!apiKey) {
      console.error("No API key provided for MapTiler");
      return;
    }

    // southwest coordinates, northeast coordinates
    const bounds: [number, number, number, number] = [-178.00, 0.00, -49.00, 70.00];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`,
      center: [-98.5795, 39.8283],
      zoom: 4,
      maxBounds: bounds,
    });

    const markerTest = new maplibregl.Marker()
      .setLngLat([-98.5795, 39.8283])
      .addTo(map);

    // Cleanup the map when the component unmounts
    return () => map.remove();
  }, [apiKey]); // If the API key changes for any reason, this effect will run again

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%', // Make sure the map fills the container
        height: '60vh', // Set a height for the map
        position: 'relative',
      }}
    ></div>
  );
};

export default MapComponent;
