// getRecommendations.ts

import OpenAI from 'openai';

const OPENTRIPMAP_API_KEY = process.env.OPENTRIPMAP_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENAI_API_KEY,
});

interface Filters {
  latitude: number;
  longitude: number;
  weather: string | undefined;
  timeOfDay: string;
  month: string;
  transportMode: string;
  distanceKm: number;
  interests: string[];
  category: string;
  limit?: number;
}

interface Recommendation {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: string;
  tags: string[];
  rating: number;
  reviews: number;
  priceLevel: string;
  openingHours: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  timeOfDay: string[];
  transportModes: string[];
  interests: string[];
}

export const getRecommendations = async (
  filters: Filters
): Promise<Recommendation[]> => {
  const {
    latitude,
    longitude,
    distanceKm,
    interests,
    timeOfDay,
    month,
    weather,
    transportMode,
    category,
    limit = 10,
  } = filters;

  try {
    const kinds = mapInterestsToKinds(interests);

    const radius = distanceKm * 1000; // Convert km to meters

    // Fetch places from OpenTripMap
    const placesRes = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&kinds=${
        kinds.length > 0 ? kinds : 'interesting_places'
      }&limit=${limit}&apikey=${OPENTRIPMAP_API_KEY}`
    );

    const places = await placesRes.json();

    console.log('Places:', places);

    // const enrichedPlaces = await Promise.all(
    //   places.features.map(async (place: any) => {
    //     const xid = place.properties.xid;

    //     // Fetch detailed info for each place
    //     const detailRes = await fetch(
    //       `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${OPENTRIPMAP_API_KEY}`
    //     );
    //     const detail = await detailRes.json();

    //     console.log('Detail:', detail);
    //     if (detail.error) {
    //       return {
    //         address: {
    //           city: 'San Jose',
    //           country: 'United States of America',
    //           country_code: 'us',
    //           county: 'Santa Clara County',
    //           footway: 'Fairmont Plaza',
    //           neighbourhood: 'Downtown Historic District',
    //           postcode: '95113',
    //           state: 'California',
    //           suburb: 'Japantown',
    //         },
    //         image: 'https://commons.wikimedia.org/wiki/File:KnightRidder.JPG',
    //         kinds: 'skyscrapers,architecture,interesting_places',
    //         name: 'Fairmont Plaza',
    //         otm: 'https://opentripmap.com/en/card/Q14681964',
    //         point: { lat: 37.33359909057617, lon: -121.88919830322266 },
    //         preview: {
    //           height: 400,
    //           source:
    //             'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/KnightRidder.JPG/300px-KnightRidder.JPG',
    //           width: 300,
    //         },
    //         rate: '3',
    //         sources: { attributes: ['wikidata'], geometry: 'wikidata' },
    //         wikidata: 'Q14681964',
    //         wikipedia: 'https://en.wikipedia.org/wiki/Fairmont%20Plaza',
    //         wikipedia_extracts: {
    //           html: "<p><b>Fairmont Plaza</b> (previously the <b>Knight-Ridder Building</b>) is a 17-story, 79.55&nbsp;m (261.0&nbsp;ft) skyscraper in downtown San Jose, California. When completed in 1988, it was the tallest building in the city; it is currently the sixth. The building was designed by the Skidmore, Owings &amp; Merrill architecture firm.</p><p>Fairmont Plaza was completed in 1988. At the time, it was the tallest building in San Jose. San Jose's first skyscraper, the 1909, seven-story, Garden City Bank &amp; Trust Building, and the 1926, seven-story, American Trust Building were razed on the site to make way for the project.</p>",
    //           text: "Fairmont Plaza (previously the Knight-Ridder Building) is a 17-story, 79.55 m (261.0 ft) skyscraper in downtown San Jose, California. When completed in 1988, it was the tallest building in the city; it is currently the sixth. The building was designed by the Skidmore, Owings & Merrill architecture firm.Fairmont Plaza was completed in 1988. At the time, it was the tallest building in San Jose. San Jose's first skyscraper, the 1909, seven-story, Garden City Bank & Trust Building, and the 1926, seven-story, American Trust Building were razed on the site to make way for the project.",
    //           title: 'en:Fairmont Plaza',
    //         },
    //         xid: 'Q14681964',
    //       };
    //     }

    //     const baseDescription =
    //       detail.wikipedia_extracts?.text ||
    //       detail.info?.descr ||
    //       'No description available.';

    //     const prompt = generatePrompt({
    //       name: detail.name,
    //       baseDescription,
    //       weather,
    //       timeOfDay,
    //       month,
    //       transportMode,
    //       interests,
    //     });

    //     // Generate contextual description using OpenAI
    //     const completion = await openai.chat.completions.create({
    //       model: 'deepseek/deepseek-chat-v3-0324:free',
    //       messages: [
    //         { role: 'system', content: 'You are a helpful travel assistant.' },
    //         { role: 'user', content: prompt },
    //       ],
    //     });

    //     console.log(completion.choices[0].message);

    //     const generatedDescription =
    //       completion.choices[0].message?.content?.trim() || baseDescription;
    //     console.log(detail);
    //     return {
    //       id: xid,
    //       name: detail.name,
    //       description: generatedDescription,
    //       image:
    //         detail.preview?.source || 'https://via.placeholder.com/400x300',
    //       distance: `${(place.properties.dist / 1000).toFixed(1)} km`,
    //       tags: detail.kinds?.split(',').map((k: string) => k.trim()) || [],
    //       rating: 4.2 + Math.random() * 0.5,
    //       reviews: Math.floor(Math.random() * 1000),
    //       priceLevel: 'Free',
    //       openingHours: detail.properties?.opening_hours || 'Varies',
    //       coordinates: {
    //         latitude: detail?.point?.lat || latitude,
    //         longitude: detail?.point?.lon || longitude,
    //       },
    //       category: detail.kinds?.split(',')[0] || 'General',
    //       timeOfDay: ['Morning', 'Afternoon', 'Evening'],
    //       transportModes: ['Walking', 'Public Transport'],
    //       interests,
    //     };
    //   })
    // );

    return places;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

function mapInterestsToKinds(interests: string[]): string {
  const interestMap: Record<string, string> = {
    Outdoor: 'natural',
    Museum: 'cultural,museums',
    Food: 'foods',
    Chill: 'interesting_places',
    History: 'historic',
    Adventure: 'sport,amusements',
    Romantic: 'foods,romantic',
  };

  const kinds = new Set<string>();

  interests.forEach((interest) => {
    const mapped = interestMap[interest] || 'interesting_places';
    mapped.split(',').forEach((k) => kinds.add(k));
  });

  return Array.from(kinds).join(',');
}

function generatePrompt({
  name,
  baseDescription,
  weather,
  timeOfDay,
  month,
  transportMode,
  interests,
}: {
  name: string;
  baseDescription: string;
  weather: string | undefined;
  timeOfDay: string;
  month: string;
  transportMode: string;
  interests: string[];
}): string {
  return `
You're a helpful travel assistant. A user is looking for a place to visit **right now** with the following context:

- Weather: ${weather}
- Time of Day: ${timeOfDay}
- Month: ${month}
- Mode of Transport: ${transportMode}
- Interests: ${interests.join(', ')}

You're evaluating the place: **${name}**
Here's a base description: "${baseDescription}"

💡 Now write a short, enthusiastic explanation of **why this place is perfect to visit right now** based on the context.
`;
}
