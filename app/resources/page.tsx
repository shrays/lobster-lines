'use client'

import React from 'react';

export default function ResourcesPage() {
  return (
    <>
      <h1>Credits and Technical Resources</h1>
      <div className="content markdown-body">
        <p>Here I will take a deep diving into the technology that helped me develop the website. This includes frontend, backend, hosting, and graphics!</p>
        
        <h2 id="looking-for-data">Looking for Data</h2>
        <p><strong>Finding data</strong> from chain locations is simple enough: load up their site, open up the network traffic menu, and start navigating around. In terms of chain restaurants, there is often a way to get data on all locations. Some <strong>tips</strong> I have if you were to try this yourself are:</p>
        <ol>
          <li>Find a page that lists all their locations. <a href="https://cava.com/locations">CAVA</a>, a chipotle-style mediterrean restaurant, lists all their locations on one site page. By scraping the location information, you can get links to every individual store website and thus individualized menu prices.</li>
          <li>Find a page that &quot;Finds the nearest location.&quot; These companies, like <a href="https://www.redlobster.com/seafood-restaurants/">Red Lobster</a>, use a get request to find the n closest stores to you. By changing the parameters of the API request to manipulate the store amount limit, location radius, and origin location, all locations and any relavent meta data can be obtained.</li>
          <li>Theres usually a way these sites connect. If you find a JSON being fetched, look for store IDs and see if they might be used in the URLs to navigate to specific stores.</li>
        </ol>

        <h2 id="tools-i-considered-technical-stack">Tools I considered: Technical Stack</h2>
        <p>
          State Management - Zustand, Redux <br/>
          UI Libraries - React, Vue <br/>
          Hosting - Vercel, Netlify <br/>
          Backend - NodeJS (If you can consider it a backend), Vercel Serverless Functions <br/>
          Map Tiles - MapTiler <br/>
          Map Controls - MapLibreGL, OpenMapTiler, Leaflet
        </p>

        <h2 id="challenges-i-faced">Challenges I Faced</h2>
        <p>A difficulty in working with third party data is having to adapt to unannounced changes on their end. One instance of this was changes Red Lobster made to their API regarding wait times. The update they made, in addition to adding wait time descriptions on their map sidebar, was restricting access to their estimatedWaitTime JSON element (Only returning empty strings). I got around this by specifying a user-agent in the request heading.</p>
        <p>Dealing with API keys is a simple: don&#39;t let anyone else see them. Or thats what I thought going into adding the map. The service I used to fetch stylized map tiles, <a href="https://www.maptiler.com/cloud/">MapTiler</a>, displayed the map and with it, my private key. I spent a day trying to set up a routing layer and a proxy in order to hide it before I realized this was normal and I was meant to whitelist my domain name with my account. 💀 </p>
        
        <h2 id="run-it-yourself">Run it Yourself</h2>
        <p>Check out the GitHub <a href="https://github.com/shrays/lobster-lines">README.md</a> for information about running the project!</p>

      </div>
    </>
  )
}
