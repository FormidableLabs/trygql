import ms from 'ms';
import { asNexusMethod, enumType, objectType, nonNull, stringArg, idArg } from 'nexus';
import { GraphQLLatitude, GraphQLLongitude, GraphQLDate, GraphQLURL } from 'graphql-scalars';

import { searchLocations, getForecast, parseLatLng } from './data/metaweather';

export const Latitude = asNexusMethod(GraphQLLatitude, 'latitude');
export const Longitude = asNexusMethod(GraphQLLongitude, 'longitude');
export const Date = asNexusMethod(GraphQLDate, 'date');
export const URL = asNexusMethod(GraphQLURL, 'url');

export const GeoCoordinates = objectType({
  name: 'GeoCoordinates',
  definition(t) {
    t.latitude('latitude', { required: true });
    t.longitude('longitude', { required: true });
  },
});

export const LocationType = enumType({
  name: 'LocationType',
  description:
    'Type of location, e.g. City, Region, Country, Continent',
  members: [
    'City',
    'Region',
    'Country',
    'Continent',
  ],
});

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.id('id', {
      required: true,
      resolve: parent => `${parent.woeid}`,
    });

    t.string('name', {
      resolve: parent => parent.title,
    });

    t.field('type', {
      type: LocationType,
      resolve: parent => {
        switch (parent.location_type) {
          case 'City': return 'City';
          case 'Region / State / Province': return 'Region';
          case 'Country': return 'Country';
          case 'Continent': return 'Continent';
          default: return null as any;
        }
      },
    });

    t.field('coordinates', {
      type: GeoCoordinates,
      resolve: parent => parseLatLng(parent.latt_long),
    });

    t.field('forecast', {
      type: Forecast,
      ttl: 3600,
      resolve: (parent, _args) => getForecast(parent.woeid),
    });
  }
});

export const WeatherState = enumType({
  name: 'WeatherState',
  members: [
    'Snow',
    'Sleet',
    'Hail',
    'Thunderstorm',
    'HeavyRain',
    'LightRain',
    'Showers',
    'HeavyCloud',
    'LightCloud',
    'Clear',
  ],
});

export const CompassPoint = enumType({
  name: 'CompassPoint',
  description: '16-wind compass rose including eight half-winds, e.g. NNW ("North-North-West")',
  members: ['N', 'NNW', 'NW', 'WNW', 'W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE'],
});

export const Wind = objectType({
  name: 'Wind',
  description: 'Describes the wind speed and direction',
  definition(t) {
    t.field('compassDirection', { type: CompassPoint });
    t.float('direction', { description: 'Wind direction in degrees' });
    t.float('speed', { description: 'Wind speed in mph (mile per hour)' });
  },
});

export const Temperature = objectType({
  name: 'Temperature',
  description: 'Temperature including min & max in centigrade',
  definition(t) {
    t.int('average');
    t.int('min');
    t.int('max');
  },
});

export const Weather = objectType({
  name: 'Weather',
  definition(t) {
    t.id('id', {
      required: true,
      resolve: parent => `${parent.id}`,
    });

    t.date('date', {
      required: true,
      description: 'Date for which this forecast is for',
      resolve: parent => parent.applicable_date,
    });

    t.field('state', {
      type: WeatherState,
      resolve: parent => {
        switch (parent.weather_state_name) {
          case 'Heavy Rain': return 'HeavyRain';
          case 'Light Rain': return 'LightRain';
          case 'Heavy Cloud': return 'HeavyCloud';
          case 'Light Cloud': return 'LightCloud';
          default:
            return parent.weather_state_name as any;
        }
      },
    });

    t.field('wind', {
      type: Wind,
      resolve: parent => ({
        compassDirection: parent.wind_direction_compass,
        direction: parent.wind_direction,
        speed: parent.wind_speed,
      }),
    });

    t.field('temperature', {
      type: Temperature,
      resolve: parent => ({
        average: Math.round(parent.the_temp),
        min: Math.round(parent.min_temp),
        max: Math.round(parent.max_temp),
      }),
    });

    t.float('pressure', {
      description: 'Air pressure in mbar',
      resolve: parent => parent.air_pressure,
    });

    t.float('humidity', {
      description: 'Humidity in percentage',
      resolve: parent => parent.humidity,
    });

    t.float('visibility', {
      description: 'Visibility in miles',
      resolve: parent => parent.visibility,
    });

    t.int('predictability', {
      description: 'Percentage of consensus between all available weather sources (100% being full consensus)',
      resolve: parent => Math.round(parent.predictability),
    });
  },
});

export const Source = objectType({
  name: 'Source',
  description: 'Source used to derive weather data from',
  definition(t) {
    t.id('id', { required: true, resolve: parent => parent.slug });
    t.string('name', { resolve: parent => parent.title });
    t.url('url');
  },
});

export const Forecast = objectType({
  name: 'Forecast',
  definition(t) {
    t.string('timezone');

    t.list.field('weather', {
      type: Weather,
      description: 'Weather of today and the next five days',
      resolve: parent => parent.consolidated_weather,
    });

    t.list.field('sources', {
      type: Source,
      description: 'Sources crawled to derive the weather forecast',
    });

    t.field('location', {
      type: Location,
      resolve: parent => ({
        woeid: parent.woeid,
        title: parent.title,
        location_type: parent.location_type,
        latt_long: parent.latt_long,
      }),
    });

    t.field('parent', { type: Location });
    t.list.field('children', { type: Location });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('locations', {
      type: Location,
      description: 'Search for locations by a query of their name',
      args: {
        query: nonNull(stringArg()),
      },
      ttl: ms('1d'),
      resolve: (_, { query }) => searchLocations(query),
    });

    t.field('forecast', {
      type: Forecast,
      description: 'Retrieve a forecast for a location by its ID.',
      args: {
        locationId: nonNull(idArg()),
      },
      ttl: ms('1h'),
      resolve: (_, { locationId }) => getForecast(locationId),
    });
  },
});
