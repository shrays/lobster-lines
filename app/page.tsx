"use client"

import React, { useEffect, useState } from 'react';
import MapComponent from './components/Map';
import HorizontalScrollCards from './components/ScrollCards';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  // info: string;
};

type Summary = {
  totalStores: number;
  storesOpen: number;
  storesWithWaitlist: number;
  averageWaitTime: number;
  storesTemporarilyClosed: number;
};

export default function IndexPage() {
  const [locationData, setLocationData] = useState<Location[] | null>(null);
  const [summaryData, setSummaryData] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lobster-locations');
        const json = await response.json();
      
        const { locations, summary } = json;
        setLocationData(json.locations);
        setSummaryData(json.summary);
      
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MapComponent locations={locationData} />
      {summaryData && <HorizontalScrollCards summaryData={summaryData} />}

      <div className='content'>
        {/* <h2 style={{ textAlign: "center" }}>Welcome to Lobster Lines!</h2> */}
      </div>
    </>
  )
}
