import got from 'got';
import ms from 'ms';
import { Context } from '@trygql/api/context';

const metaweather = got.extend({
  prefixUrl: 'https://www.metaweather.com/api',
  responseType: 'json',
  cacheOptions: {
    shared: false,
    cacheHeuristic: 1,
    immutableMinTimeToLive: ms('1h'),
    ignoreCargoCult: true,
  },
});

export enum LocationType {
  City = 'City',
  Region = 'Region / State / Province',
  Country = 'Country',
  Continent = 'Continent'
}

export interface Location {
  woeid: number;
  title: string;
  location_type: LocationType;
  latt_long: string;
}

export const searchLocations = async (
  context: Context,
  query: string
): Promise<Location[]> =>
  metaweather
    .get('location/search/', {
      cache: context.store,
      searchParams: { query },
    })
    .json();

export type WeatherState =
  | 'Snow'
  | 'Sleet'
  | 'Hail'
  | 'Thunderstorm'
  | 'Heavy Rain'
  | 'Light Rain'
  | 'Showers'
  | 'Heavy Cloud'
  | 'Light Cloud'
  | 'Clear';

export type CompassPoint =
  | 'N'
  | 'NNW'
  | 'NW'
  | 'WNW'
  | 'W'
  | 'WSW'
  | 'SW'
  | 'SSW'
  | 'S'
  | 'SSE'
  | 'SE'
  | 'ESE'
  | 'E'
  | 'ENE'
  | 'NE'
  | 'NNE';

export interface Weather {
  id: number;
  weather_state_name: WeatherState;
  weather_state_abbr: string;
  wind_direction_compass: CompassPoint;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

export interface Source {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
}

export interface Forecast extends Location {
  timezone: string;
  timezone_name: string;
  sun_set: string;
  sun_rise: string;
  time: string;
  consolidated_weather: Weather[];
  sources: Source[];
  parent?: Location;
  children?: Location[];
}

export const getForecast = async (
  context: Context,
  woeid: number | string
): Promise<Forecast | null> => {
  try {
    return await metaweather
      .get(`location/${woeid}/`, { cache: context.store })
      .json();
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return null;
    throw error;
  }
};

export const parseLatLng = (latlng: string) => {
  const [lat, lng] = latlng.trim().split(',').map(parseFloat);
  return { latitude: lat, longitude: lng };
};
