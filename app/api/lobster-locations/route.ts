import { NextRequest, NextResponse } from 'next/server';

var zipcode_to_timezone = require('zipcode-to-timezone');
var { formatInTimeZone } = require('date-fns-tz');

type Location = {
  latitude: number;
  longitude: number;
  estimatedWaitTime: number;
  address: string;
  city: string;
  zip: string;
  phone: string;
  webURL: string;
};

type AvailabilitySlot = {
  fullDateTime: string;
  twelveHourTime: string;
  isAvailable: boolean;
  onlineSuspended: boolean;
};

var canadaTimezoneMapping: Record<string, string[]> = {
  'America/Chicago': ['S', 'R'],
  'America/New_York': ['J', 'G', 'H', 'L', 'K', 'M', 'N', 'P'],
  'America/Denver': ['T'],
  'America/Los_Angeles': ['V', 'Y'],
  'America/Halifax': ['B', 'C', 'E'],
  'America/St_Johns': ['A'],
};

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
};

const CONCURRENCY_LIMIT = 50;

function getTimezone(zip: string): string {
  zip = zip.trim().toUpperCase();
  if (isNaN(parseInt(zip.charAt(0)))) {
    for (var timezone in canadaTimezoneMapping) {
      if (canadaTimezoneMapping[timezone].some((prefix: string) => zip.startsWith(prefix))) {
        return timezone;
      }
    }
    return 'America/New_York';
  }
  return zipcode_to_timezone.lookup(zip) || 'America/New_York';
}

function isOpen(zip: string, open: string, close: string): boolean {
  const tz = getTimezone(zip);
  var currentTime = formatInTimeZone(new Date(), tz, 'HH:mm');

  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map((num: string) => parseInt(num, 10));
    if (hours === 12) {
      hours = modifier.toUpperCase() === 'AM' ? 0 : 12;
    } else if (modifier.toUpperCase() === 'PM') {
      hours += 12;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const openTime24 = convertTo24HourFormat(open);
  const closeTime24 = convertTo24HourFormat(close);
  return currentTime >= openTime24 && currentTime <= closeTime24;
}

function getLocalTimeInfo(zip: string): { date: string; time: string } {
  const tz = getTimezone(zip);
  const now = new Date();
  const date = formatInTimeZone(now, tz, 'yyyy-MM-dd');
  const hours = parseInt(formatInTimeZone(now, tz, 'HH'));
  const minutes = parseInt(formatInTimeZone(now, tz, 'mm'));
  const roundedMinutes = Math.floor(minutes / 15) * 15;

  const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const timeStr = `${h12}:${roundedMinutes.toString().padStart(2, '0')} ${ampm}`;

  return { date, time: timeStr };
}

async function fetchWaitTime(rlid: string, zip: string): Promise<number> {
  try {
    const { date, time } = getLocalTimeInfo(zip);
    const url = `https://www.redlobster.com/ecomm/api/reservations/availabilities/${rlid}?date=${date}&time=${encodeURIComponent(time)}&partySize=1`;
    const response = await fetch(url, { headers: HEADERS });
    const slots: AvailabilitySlot[] = await response.json();

    if (!Array.isArray(slots) || slots.length === 0) return 0;

    const firstAvailable = slots.find((slot) => slot.isAvailable && !slot.onlineSuspended);
    if (!firstAvailable) return 0;

    const requestedTime = new Date(slots[0].fullDateTime);
    const availableTime = new Date(firstAvailable.fullDateTime);
    const diffMinutes = (availableTime.getTime() - requestedTime.getTime()) / 60000;

    return Math.max(0, diffMinutes);
  } catch {
    return 0;
  }
}

async function processInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const url =
    'https://www.redlobster.com/api/location/getlocations?latitude=39&longitude=-98&radius=4000&limit=1000';

  const externalResponse = await fetch(url, { headers: HEADERS });
  const data = await externalResponse.json();

  const today = new Date();
  const dayOfWeek = today.getDay();

  // Build initial location data with open/closed status
  const locationsWithStatus = data.locations.map((item: any) => {
    const loc = item.location;
    const temporarilyClosed = loc.isTemporarilyClosed === true;
    const open = !temporarilyClosed && isOpen(loc.zip, loc.hours[dayOfWeek].open, loc.hours[dayOfWeek].close);

    return {
      rlid: loc.rlid,
      latitude: loc.latitude,
      longitude: loc.longitude,
      address: loc.address1,
      city: loc.city,
      zip: loc.zip,
      phone: loc.phone,
      webURL: loc.localPageURL,
      isOpen: open,
      isTemporarilyClosed: temporarilyClosed,
    };
  });

  // Fetch wait times for open locations only
  const openLocations = locationsWithStatus.filter((loc: any) => loc.isOpen);

  const waitTimes = await processInBatches(openLocations, CONCURRENCY_LIMIT, (loc: any) =>
    fetchWaitTime(loc.rlid, loc.zip)
  );

  const waitTimeMap = new Map<string, number>();
  openLocations.forEach((loc: any, i: number) => {
    waitTimeMap.set(loc.rlid, waitTimes[i]);
  });

  // Build final response
  const simplifiedData: Location[] = locationsWithStatus.map((loc: any) => {
    let estimatedWaitTime: number;
    if (loc.isTemporarilyClosed) {
      estimatedWaitTime = -2;
    } else if (!loc.isOpen) {
      estimatedWaitTime = -1;
    } else {
      estimatedWaitTime = waitTimeMap.get(loc.rlid) ?? 0;
    }

    return {
      latitude: loc.latitude,
      longitude: loc.longitude,
      estimatedWaitTime,
      address: loc.address,
      city: loc.city,
      zip: loc.zip,
      phone: loc.phone,
      webURL: loc.webURL,
    };
  });

  const totalStores = simplifiedData.length;
  const openStores = simplifiedData.filter(
    (item: Location) => item.estimatedWaitTime !== -1 && item.estimatedWaitTime !== -2
  );
  const storesOpen = openStores.length;
  const storesWithWaitlist = openStores.filter((item: Location) => item.estimatedWaitTime > 0).length;
  const storesTemporarilyClosed = simplifiedData.filter(
    (item: Location) => item.estimatedWaitTime === -2
  ).length;
  const totalWaitTimeForOpenStores = openStores.reduce(
    (acc: number, item: Location) => acc + item.estimatedWaitTime,
    0
  );
  const averageWaitTime = storesOpen > 0 ? totalWaitTimeForOpenStores / storesOpen : 0;

  const summary = {
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
