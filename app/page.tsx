"use client"

import React, { useEffect, useState } from 'react';
import MapComponent from './components/Map';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  // info: string;
};

export default function IndexPage() {
  const [locationData, setLocationData] = useState<Location[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lobster-locations');
        const json = await response.json();
        setLocationData(json.map((loc: any) => ({ latitude: loc.latitude, longitude: loc.longitude, estimatedWaitTime: loc.estimatedWaitTime, info: loc.info })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MapComponent locations={locationData} />
      <div className='content'>
        {/* <h2 style={{ textAlign: "center" }}>Welcome to Lobster Lines!</h2> */}
      </div>
    </>
  )
}
