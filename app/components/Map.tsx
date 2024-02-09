'use client'
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  // info: string;
};

type MapComponentProps = {
  locations: Location[] | null;
};

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  const getMarkerColor = (waitTime: number) => {
    if (waitTime === -1) return 'gray';
    if (waitTime === 0) return 'green';
    if (waitTime >= 5 && waitTime <= 10) return 'orange';
    if (waitTime >= 15) return 'red';
    return 'black';
  };

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    const contCenter: [number, number] = [-98.5795, 39.8283];
    const bounds: [number, number, number, number] = [contCenter[0]-100, contCenter[1]-50, contCenter[0]+100, contCenter[1]+30];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`,
      center: contCenter,
      zoom: 3.5,
      maxBounds: bounds,
    });

    // Check if locations is not null before creating markers
    if (locations) {
      // sort locations from lowest to highest longitude. (loc.longitude)

      locations.forEach((loc) => {
        const popup = new maplibregl.Popup({offset: 25}).setText('Time: ' + loc.estimatedWaitTime);
        const parent = document.createElement('div')
        const el = document.createElement('div');
        parent.appendChild(el);
        el.style.width = '0.9vh';
        el.style.height = '0.9vh';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = getMarkerColor(loc.estimatedWaitTime);

        const marker = new maplibregl.Marker({ element: parent })
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(popup)
          .addTo(map);
        map.on('zoom', () => {
          const scale = 1 + (map.getZoom() - 4) * 0.4;
          const svgElement = marker.getElement().children[0] as HTMLElement;
          svgElement.style.transform = `scale(${scale})`;
        });

        // const marker = new maplibregl.Marker({
        //   color: getMarkerColor(loc.estimatedWaitTime)
        // }).setLngLat([loc.longitude, loc.latitude])
        // .setPopup(popup)
        // .addTo(map)
        // map.on('zoom', () => {
        //   const scale = 1 + (map.getZoom() - 4) * 0.4;
        //   const svgElement = marker.getElement().children[0] as HTMLElement;
        //   svgElement.style.transform = `scale(${scale})`;
        // });

      });
    }

    // Example scale on zoom, not currently functional with custom marker
    // const marker2 = new maplibregl.Marker()
    //   .setLngLat([-98.5795, 39.8283])
    //   .addTo(map);
    // map.on('zoom', () => {
    //   const scale = 1 + (map.getZoom() - 4) * 0.4;
    //   const svgElement = marker2.getElement().children[0] as HTMLElement;
    //   svgElement.style.transform = `scale(${scale})`;
    // });

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
