export const STORE_COORDINATES = {
  lat: -31.7659023,
  lon: -60.5272884,
};

export const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

interface GeoResponse {
  features: Array<{
    geometry: {
      coordinates: [number, number]; // lon, lat
    };
    properties: {
      formatted: string;
    };
  }>;
}

export async function getCoordinates(address: string): Promise<{ lat: number; lon: number; formatted: string } | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    // Add bias to store location and strict filter within 25km of the store to avoid Buenos Aires results
    const locationParams = `&bias=proximity:${STORE_COORDINATES.lon},${STORE_COORDINATES.lat}&filter=circle:${STORE_COORDINATES.lon},${STORE_COORDINATES.lat},25000`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}${locationParams}&apiKey=${GEOAPIFY_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch coordinates");
    
    const data: GeoResponse = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      return {
        lon: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
        formatted: feature.properties.formatted
      };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}

// Haversine formula to calculate distance in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(2));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Pricing model: Base $500 + $150 per km
// Pricing model:
// < 1km: $1800 (minimum)
// 1km - 1.99km: $2000
// >= 2km: $3000 + $1000 for each additional km
export function calculateShippingCost(distanceKm: number): number {
  if (distanceKm < 1) {
    return 1800;
  }
  
  // Logic: 1km range = $2000, 2km range = $3000, 3km range = $4000...
  // Formula: 2000 + (floor(km) - 1) * 1000
  const kms = Math.floor(distanceKm);
  return 2000 + (kms - 1) * 1000;
}
