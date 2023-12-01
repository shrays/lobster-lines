"use client"

import React, { useEffect, useState } from 'react';
import MapComponent from './components/Map';

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
};

export default function IndexPage() {
  const [locationData, setLocationData] = useState<Location[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lobster-locations');
        const json = await response.json();
        setLocationData(json.map((loc: any) => ({ latitude: loc.latitude, longitude: loc.longitude, estimatedWaitTime: loc.estimatedWaitTime })));
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
        <h2 style={{ textAlign: "center" }}>Welcome to Lobster Lines!</h2>
        <p style={{ textAlign: "center" }}>
          Your ultimate guide to enjoying the finest lobster dining experience. Skip the guesswork, look at real-time waits at your nearest Red Lobster, and dive into a sea of delicious possibilities.
        </p>
        <div className="container">
          <div className="leftSection">
              <video className="videoComponent" controls>
                <source src="/lobster_video.mp4" type="video/mp4" />
                The video component is not supported by your browser.
              </video>
              <p>Here's a video of some lobsters while you wait!</p>
          </div>
          <div className="rightSection">
              <h2>Lobster Fun Facts:</h2>
              <ul style={{ listStyleType: "none" }}>
                <li><strong>Clear Blood:</strong> Lobsters have clear blood that, when cooked, produces a thick opaque white substance.</li>
                <li><strong>Can't Feel Pain:</strong> Most scientists would agree that lobsters are not able to process pain. The hissing noise from boiling lobsters may be mistaken for crying or screaming but it is just steam escaping from the shell!</li>
                <li><strong>Biologically Immortal</strong> Lobsters do not show signs of aging. Most die from predators or disease. Old age death typically occurs when a lobster cannot molt and rots inside its shell.</li>
              </ul>
          </div>
        </div>
      </div>
    </>
  )
}
