import { NextRequest, NextResponse } from 'next/server';

var zipcode_to_timezone = require( 'zipcode-to-timezone' );
var { formatInTimeZone } = require('date-fns-tz');

var canadaTimezoneMapping : Record<string, string[]> = { // Guesses based on province. Excluding X0C, X0A, X0B
  'America/Chicago': ['S', 'R'],
  'America/New_York': ['J', 'G', 'H', 'L', 'K', 'M', 'N', 'P'],
  'America/Denver': ['T'],
  'America/Los_Angeles': ['V', 'Y'],
  'America/Halifax': ['B', 'C', 'E'],
  'America/St_Johns': ['A']
};

function parseWaitTime(waitTime: string | null | undefined, zip: string, open: string, close: string, temporarilyClosed: boolean): number {
  waitTime = waitTime ?? '';

  if (isOpen(zip, open, close, temporarilyClosed) === false) {
    return -1;
  } else if (waitTime === '') {
    return 0;
  }
  else {
      const match = waitTime.match(/About (\d+) minutes/);
      return match ? parseInt(match[1], 10) : -1;  
  }
}

function isOpen(zip: string, open: string, close: string, temporarilyClosed: boolean): boolean {
  if(temporarilyClosed == true) { return false}

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
  // var info = zip  + "\n" + isOpenNow + "\n" + currentTime + "\n" + openTime24 + "\n" + closeTime24 + "\n";
  return isOpenNow ? true : false;
}

export async function GET(req: NextRequest) {
  const url = 'https://www.redlobster.com/api/location/getlocations?latitude=39&longitude=-98&radius=4000&limit=1000';

  // Mimick user-agent
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
  };

  const externalResponse = await fetch(url, { headers });
  const data = await externalResponse.json();
  // console.log(JSON.stringify(data.locations, null, 2));

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
    // info: 'Val: ' + isOpen(item.location.zip, item.location.hours[dayOfWeek].open, item.location.hours[dayOfWeek].close, item.location.isTemporarilyClosed)
  }));

  return new NextResponse(JSON.stringify(simplifiedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
