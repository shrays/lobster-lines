import { NextRequest, NextResponse } from 'next/server';

function parseWaitTime(waitTime: string | null | undefined): number {
  // Check if waitTime is undefined or null and provide a default empty string
  waitTime = waitTime ?? '';

  if (waitTime === 'Now Seating') {
    return 0;
  } else if (waitTime === '') {
    return -1;
  }
  else {
      const match = waitTime.match(/About (\d+) minutes/);
      return match ? parseInt(match[1], 10) : -1;  
  }
}

export async function GET(req: NextRequest) {
  const url = 'https://www.redlobster.com/api/location/getlocations?latitude=0&longitude=0&radius=1000000&limit=10000';
  const externalResponse = await fetch(url);
  const data = await externalResponse.json();

  const simplifiedData = data.locations.map((item: any) => ({
    latitude: item.location.latitude,
    longitude: item.location.longitude,
    estimatedWaitTime: parseWaitTime(item.location.estimatedWaitTime),
  }));

  return new NextResponse(JSON.stringify(simplifiedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}