Here I will take a deep diving into the technology that helped me develop the website. This includes frontend, backend, hosting, and graphics!

## Looking for Data
**Finding data** from chain locations is simple enough: load up their site, open up the network traffic menu, and start navigating around. In terms of chain restaurants, there is often a way to get data on all locations. Some **tips** I have if you were to try this yourself are:

1. Find a page that lists all their locations. [CAVA](https://cava.com/locations), a chipotle-style mediterrean restaurant, lists all their locations on one site page. By scraping the location information, you can get links to every individual store website and thus individualized menu prices.
2. Find a page that "Finds the nearest location." These companies, like [Red Lobster](https://www.redlobster.com/seafood-restaurants/), use a get request to find the n closest stores to you. By changing the parameters of the API request to manipulate the store amount limit, location radius, and origin location, all locations and any relavent meta data can be obtained. Some stores limit set hard limits on their api requests regarding search radius or location count. In cases like these, one option is to iteratively check segments such as zip codes. I created a simple equation that gives a list of centers of circles which cover the entire area of a rectangle. You can find that on [Desmos](https://www.desmos.com/calculator/vrjbku6pzz)
3. Theres usually a way these sites connect. If you find a JSON being fetched, look for store IDs and see if they might be used in the URLs to navigate to specific stores.

## Tools I considered: Technical Stack
State Management - Zustand, Redux
UI Libraries - React, Vue
Hosting - Vercel, Netlify
Backend - NodeJS (If you can consider it a backend), Vercel Serverless Functions
Map Tiles - MapTiler
Map Controls - MapLibreGL, OpenMapTiler, Leaflet

## Challenges I Faced
A difficulty in working with third party data is having to adapt to unannounced changes on their end. One instance of this was changes Red Lobster made to their API regarding wait times. The update they made, in addition to adding wait time descriptions on their map sidebar, was restricting access to their estimatedWaitTime JSON element (Only returning empty strings). I got around this by specifying a user-agent in the request heading.

Dealing with private API keys is simple: keep them private. Or thats what I thought going into adding the map. The service I used to fetch stylized map tiles, [MapTiler](https://www.maptiler.com/cloud/), displayed the plain text key in the XHR requests. I ended up spending the better part of my day trying to set up routing layers, serverless functions, and proxies in order to hide the string before I realized this was normal behavior. MapTiler had a menu where I could whitelist specific domains. 

## Run it Yourself
Check out the GitHub [README.md](https://github.com/shrays/lobster-lines) for information about running the project!


