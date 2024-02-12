"use client"

import React, { useEffect, useState } from 'react';
import MapComponent from './components/Map';
import HorizontalScrollCards from './components/ScrollCards';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  address: string,
  city: string,
  zip: string,
  phone: string,
  webURL: string,
  // lastUpdated: number,
};

type Summary = {
  lastUpdate: number;
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
      <div className='middle-text'>
        {summaryData && `${summaryData.lastUpdate.toFixed(0)} minutes since Red Lobster updated their online wait times.`}
      </div>
    </>
  )
}
