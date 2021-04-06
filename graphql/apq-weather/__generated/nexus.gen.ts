/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as metaweather from './../data/metaweather';
import { Context } from '@trygql/api/context';
import { core } from 'nexus';
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude
     */
    latitude<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "Latitude";
    /**
     * A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude
     */
    longitude<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "Longitude";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "Date";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude
     */
    latitude<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "Latitude";
    /**
     * A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude
     */
    longitude<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "Longitude";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "Date";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "URL";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  CompassPoint: metaweather.CompassPoint;
  LocationType: metaweather.LocationType;
  WeatherState: metaweather.WeatherState;
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Date: any;
  Latitude: any;
  Longitude: any;
  URL: any;
}

export interface NexusGenObjects {
  Forecast: metaweather.Forecast;
  GeoCoordinates: {
    // root type
    latitude: NexusGenScalars['Latitude']; // Latitude!
    longitude: NexusGenScalars['Longitude']; // Longitude!
  };
  Location: metaweather.Location;
  Query: {};
  Source: metaweather.Source;
  Temperature: {
    // root type
    average?: number | null; // Int
    max?: number | null; // Int
    min?: number | null; // Int
  };
  Weather: metaweather.Weather;
  Wind: {
    // root type
    compassDirection?: NexusGenEnums['CompassPoint'] | null; // CompassPoint
    direction?: number | null; // Float
    speed?: number | null; // Float
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Forecast: {
    // field return type
    children: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    location: NexusGenRootTypes['Location'] | null; // Location
    parent: NexusGenRootTypes['Location'] | null; // Location
    sources: Array<NexusGenRootTypes['Source'] | null> | null; // [Source]
    timezone: string | null; // String
    weather: Array<NexusGenRootTypes['Weather'] | null> | null; // [Weather]
  };
  GeoCoordinates: {
    // field return type
    latitude: NexusGenScalars['Latitude']; // Latitude!
    longitude: NexusGenScalars['Longitude']; // Longitude!
  };
  Location: {
    // field return type
    coordinates: NexusGenRootTypes['GeoCoordinates'] | null; // GeoCoordinates
    forecast: NexusGenRootTypes['Forecast'] | null; // Forecast
    id: string; // ID!
    name: string | null; // String
    type: NexusGenEnums['LocationType'] | null; // LocationType
  };
  Query: {
    // field return type
    forecast: NexusGenRootTypes['Forecast'] | null; // Forecast
    locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
  };
  Source: {
    // field return type
    id: string; // ID!
    name: string | null; // String
    url: NexusGenScalars['URL'] | null; // URL
  };
  Temperature: {
    // field return type
    average: number | null; // Int
    max: number | null; // Int
    min: number | null; // Int
  };
  Weather: {
    // field return type
    date: NexusGenScalars['Date']; // Date!
    humidity: number | null; // Float
    id: string; // ID!
    predictability: number | null; // Int
    pressure: number | null; // Float
    state: NexusGenEnums['WeatherState'] | null; // WeatherState
    temperature: NexusGenRootTypes['Temperature'] | null; // Temperature
    visibility: number | null; // Float
    wind: NexusGenRootTypes['Wind'] | null; // Wind
  };
  Wind: {
    // field return type
    compassDirection: NexusGenEnums['CompassPoint'] | null; // CompassPoint
    direction: number | null; // Float
    speed: number | null; // Float
  };
}

export interface NexusGenFieldTypeNames {
  Forecast: {
    // field return type name
    children: 'Location';
    location: 'Location';
    parent: 'Location';
    sources: 'Source';
    timezone: 'String';
    weather: 'Weather';
  };
  GeoCoordinates: {
    // field return type name
    latitude: 'Latitude';
    longitude: 'Longitude';
  };
  Location: {
    // field return type name
    coordinates: 'GeoCoordinates';
    forecast: 'Forecast';
    id: 'ID';
    name: 'String';
    type: 'LocationType';
  };
  Query: {
    // field return type name
    forecast: 'Forecast';
    locations: 'Location';
  };
  Source: {
    // field return type name
    id: 'ID';
    name: 'String';
    url: 'URL';
  };
  Temperature: {
    // field return type name
    average: 'Int';
    max: 'Int';
    min: 'Int';
  };
  Weather: {
    // field return type name
    date: 'Date';
    humidity: 'Float';
    id: 'ID';
    predictability: 'Int';
    pressure: 'Float';
    state: 'WeatherState';
    temperature: 'Temperature';
    visibility: 'Float';
    wind: 'Wind';
  };
  Wind: {
    // field return type name
    compassDirection: 'CompassPoint';
    direction: 'Float';
    speed: 'Float';
  };
}

export interface NexusGenArgTypes {
  Query: {
    forecast: {
      // args
      locationId: string; // ID!
    };
    locations: {
      // args
      query: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean;
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[];
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean;
    /**
    The TTL (time to live) for the given field’s cached results.
     */
    ttl?: number;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean;
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[];
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean;
  }
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean;
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[];
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean;
  }
}
