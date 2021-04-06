import { got } from '@trygql/api/got';

const metaweather = got.extend({
  prefixUrl: 'https://www.metaweather.com/api',
});

export const enum LocationType {
  City = 'City',
  Region = 'Region / State / Province',
  Country = 'Country',
  Continent = 'Continent',
}

export interface Location {
  woeid: number;
  title: string;
  location_type: LocationType;
  latt_long: string;
}

export const searchLocations = async (query: string): Promise<Location[]> =>
  metaweather
    .get('location/search/', { searchParams: { query } })
    .json();

export enum WeatherState {
  Snow = 'sn',
  Sleet = 'sl',
  Hail = 'h',
  Thunder = 't',
  HeavyRain = 'hr',
  LightRain = 'lr',
  Showers = 's',
  HeavyCloud = 'hc',
  LightCloud = 'lc',
  Clear = 'c',
}

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
  weather_state_name: string;
  weather_state_abbr: WeatherState;
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

export const getForecast = async (woeid: number | string): Promise<Forecast | null> => {
  try {
    return await metaweather.get(`location/${woeid}/`).json();
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return null;
    throw error;
  }
};

export const parseLatLng = (latlng: string) => {
  const [lat, lng] = latlng.trim().split(',').map(parseFloat);
  return { latitude: lat, longitude: lng };
};
