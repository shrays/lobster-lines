import { NextRequest, NextResponse } from 'next/server';

var zipcode_to_timezone = require( 'zipcode-to-timezone' );
var { formatInTimeZone } = require('date-fns-tz');

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
}

var canadaTimezoneMapping : Record<string, string[]> = { // Guesses based on province. Excluding X0C, X0A, X0B
  'America/Chicago': ['S', 'R'],
  'America/New_York': ['J', 'G', 'H', 'L', 'K', 'M', 'N', 'P'],
  'America/Denver': ['T'],
  'America/Los_Angeles': ['V', 'Y'],
  'America/Halifax': ['B', 'C', 'E'],
  'America/St_Johns': ['A']
};

function parseWaitTime(waitTime: string | null | undefined, zip: string, open: string, close: string, temporarilyClosed: boolean): number {
  if(temporarilyClosed == true) { return -2 }
  waitTime = waitTime ?? '';

  if (isOpen(zip, open, close) === false) {
    return -1;
  } else if (waitTime === '') {
    return 0;
  }
  else {
      const match = waitTime.match(/About (\d+) minutes/);
      return match ? parseInt(match[1], 10) : -1;  
  }
}

function isOpen(zip: string, open: string, close: string): boolean {
  zip = zip.trim().toUpperCase();
  var tz = '';

  // Canada vs US zip
  if (isNaN(parseInt(zip.charAt(0)))) {
    for (var timezone in canadaTimezoneMapping) {
      if (canadaTimezoneMapping[timezone].some((prefix: string) => zip.startsWith(prefix))) {
        tz = timezone; 
      }
    }
  } else {
    tz = zipcode_to_timezone.lookup(zip);
  }

  var currentTime = formatInTimeZone(new Date(), tz, 'HH:mm');

  const convertTo24HourFormat = (time: string) => {
    // Split the time into parts
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(num => parseInt(num, 10));

    // Adjust hours based on AM/PM
    if (hours === 12) {
      hours = modifier.toUpperCase() === 'AM' ? 0 : 12;
    } else if (modifier.toUpperCase() === 'PM') {
      hours += 12;
    }
    // Return time in HH:mm format
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Convert open and close times to 24-hour format
  const openTime24 = convertTo24HourFormat(open);
  const closeTime24 = convertTo24HourFormat(close);

  const isOpenNow = currentTime >= openTime24 && currentTime <= closeTime24;
  return isOpenNow ? true : false;
}

function parseUpdate(waitListRefreshedOn: string): number {
  const waitListDate = new Date(waitListRefreshedOn);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate.getTime() - waitListDate.getTime();
  const diffInMinutes = diffInMilliseconds / 60000;
  return Math.abs(diffInMinutes);
}

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const url = 'https://www.redlobster.com/api/location/getlocations?latitude=39&longitude=-98&radius=4000&limit=1000';

  // Mimick user-agent
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
  };

  const externalResponse = await fetch(url, { headers });
  const data = await externalResponse.json();

  const today = new Date();
  const dayOfWeek = today.getDay();

  const simplifiedData = data.locations.map((item: any) => ({
    latitude: item.location.latitude,
    longitude: item.location.longitude,
    estimatedWaitTime: parseWaitTime(
      item.location.estimatedWaitTime, 
      item.location.zip, 
      item.location.hours[dayOfWeek].open, 
      item.location.hours[dayOfWeek].close, 
      item.location.isTemporarilyClosed),
    address: item.location.address1,
    city: item.location.city,
    zip: item.location.zip,
    phone: item.location.phone,
    webURL: item.location.localPageURL,
    // lastUpdated: parseUpdate(item.location.waitListRefreshedOn),
  }));

  const lastUpdate = parseUpdate(data.locations[0].location.waitListRefreshedOn);
  const totalStores = simplifiedData.length;
  const openStores = simplifiedData.filter((item: Location) => item.estimatedWaitTime !== -1 && item.estimatedWaitTime !== -2);
  const storesOpen = openStores.length;
  const storesWithWaitlist = openStores.filter((item: Location) => item.estimatedWaitTime > 0).length;
  const storesTemporarilyClosed = simplifiedData.filter((item: Location) => item.estimatedWaitTime === -2).length;
  const totalWaitTimeForOpenStores = openStores.reduce((acc: number, item: Location) => acc + item.estimatedWaitTime, 0);
  const averageWaitTime = storesOpen > 0 ? totalWaitTimeForOpenStores / storesOpen : 0;

  const summary = {
    lastUpdate,
    totalStores,
    storesOpen,
    storesWithWaitlist,
    averageWaitTime: averageWaitTime.toFixed(2),
    storesTemporarilyClosed,
  };
  const responsePayload = {
    summary,
    locations: simplifiedData,
  };

  return new NextResponse(JSON.stringify(responsePayload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
}