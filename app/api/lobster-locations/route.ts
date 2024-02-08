import { NextRequest, NextResponse } from 'next/server';

function parseWaitTime(waitTime: string | null | undefined): number {
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

  // Mimick user-agent
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
  };

  const externalResponse = await fetch(url, { headers });
  const data = await externalResponse.json();
  // console.log(JSON.stringify(data.locations, null, 2));

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
