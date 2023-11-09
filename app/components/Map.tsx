'use client'
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
};

type MapComponentProps = {
  locations: Location[] | null;
};

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  const getMarkerColor = (waitTime: number) => {
    if (waitTime === 0) return 'green';
    if (waitTime === -1) return 'black';
    if (waitTime >= 5 && waitTime <= 25) return 'orange';
    if (waitTime >= 30) return 'red';
    return 'gray';
  };

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    const bounds: [number, number, number, number] = [-178.00, 0.00, -49.00, 70.00];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`,
      center: [-98.5795, 39.8283],
      zoom: 4,
      maxBounds: bounds,
    });

    // Check if locations is not null before creating markers
    if (locations) {
      locations.forEach((loc) => {
        const popup = new maplibregl.Popup({offset: 25}).setText('Time: ' + loc.estimatedWaitTime);
        const el = document.createElement('div');
        el.style.width = '1vh';
        el.style.height = '1vh';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = getMarkerColor(loc.estimatedWaitTime);

        new maplibregl.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }

    // Cleanup map when component unmounts
    return () => map.remove();
  }, [apiKey, locations]); // Rerun effect if apiKey / locations change

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '60vh',
        position: 'relative',
      }}
    />
  );
};

export default MapComponent;
