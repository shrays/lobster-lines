import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = 'https://www.redlobster.com/api/location/getlocations?latitude=0&longitude=0&radius=1000000&limit=10000';
  const externalResponse = await fetch(url);
  const data = await externalResponse.json();

  // Only include latitude and longitude for locations
  const simplifiedData = data.locations.map((item: any) => ({
    latitude: item.location.latitude,
    longitude: item.location.longitude
  }));

  return new NextResponse(JSON.stringify(simplifiedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}