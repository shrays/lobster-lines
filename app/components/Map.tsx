'use client'
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import Legend from './Legend';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  address: string,
  city: string,
  zip: string,
  phone: string,
  rlid: string,
};

type MapComponentProps = {
  locations: Location[] | null;
};

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  const getMarkerColor = (waitTime: number) => {
    if (waitTime === -2) return 'gray';
    if (waitTime === -1 ) return 'black';
    if (waitTime === 0) return 'green';
    if (waitTime >= 5 && waitTime <= 10) return 'orange';
    if (waitTime >= 15) return 'red';
    return 'black';
  };

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    const contCenter: [number, number] = [-98.5795, 39.8283];
    const bounds: [number, number, number, number] = [contCenter[0]-100, contCenter[1]-50, contCenter[0]+100, contCenter[1]+30];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`,
      center: contCenter,
      zoom: 3.7,
      maxBounds: bounds,
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [apiKey]);

  // Add markers when locations arrive
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !locations) return;

    // Clear previous markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    locations.forEach((loc) => {
      var directions = "https://www.google.com/maps/search/?api=1&query=Red+Lobster+" + (loc.address + " " + loc.zip + " " + loc.city).replace(/ /g, "+");
      var wait = loc.estimatedWaitTime === -1 ? '[Closed]' :
        loc.estimatedWaitTime === -2 ? '[Temporarily Closed]' :
        `${loc.estimatedWaitTime} minutes`;
      const popupContent = `<strong>${loc.address}</strong><br>${loc.city}<br>${loc.phone}<br><a href="${directions}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Directions</a> | <a href="https://www.redlobster.com/order?rlid=${loc.rlid}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Website</a><br>Wait: <strong>${wait}</strong>`;
      const popup = new maplibregl.Popup({offset: 5}).setHTML(popupContent);

      const elParent = document.createElement('div')
      const el = document.createElement('div');
      elParent.appendChild(el);
      el.style.width = '0.5vh';
      el.style.height = '0.5vh';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = getMarkerColor(loc.estimatedWaitTime);

      const marker = new maplibregl.Marker({ element: elParent })
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map);
      map.on('zoom', () => {
        const minScale = 1;
        const maxScale = 5;

        let scale = 1 + (map.getZoom() - 3.7) * 0.6;
        scale = Math.max(minScale, Math.min(scale, maxScale));

        const svgElement = marker.getElement().children[0] as HTMLElement;
        svgElement.style.transform = `scale(${scale})`;
      });
      markersRef.current.push(marker);
    });
  }, [locations]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '70vh',
        position: 'relative',
    }}>
        <Legend />
    </div>
  );
};

export default MapComponent;
