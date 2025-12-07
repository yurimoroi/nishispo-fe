// Area information type
type WeatherArea = {
  name: string;
  code: string;
};

// Common area structure
type BaseAreaInfo = {
  area: WeatherArea;
};

// Weather details area
type WeatherDetailsArea = BaseAreaInfo & {
  weatherCodes: string[];
  weathers: string[];
  winds: string[];
  waves: string[];
};

// Precipitation probability area
type PrecipitationArea = BaseAreaInfo & {
  pops: string[];
};

// Temperature area
type TemperatureArea = BaseAreaInfo & {
  temps: string[];
};

// Weekly forecast area
type WeeklyForecastArea = BaseAreaInfo & {
  weatherCodes: string[];
  pops: string[];
  reliabilities: string[];
};

// Temperature range area
type TemperatureRangeArea = BaseAreaInfo & {
  tempsMin: string[];
  tempsMinUpper: string[];
  tempsMinLower: string[];
  tempsMax: string[];
  tempsMaxUpper: string[];
  tempsMaxLower: string[];
};

// Average temperature area
type AverageArea = BaseAreaInfo & {
  min: string;
  max: string;
};

// Time series data
type TimeSeries = {
  timeDefines: string[];
  areas: Array<
    | WeatherDetailsArea
    | PrecipitationArea
    | TemperatureArea
    | WeeklyForecastArea
    | TemperatureRangeArea
  >;
};

// Weather forecast response
type WeatherForecast = {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: TimeSeries[];
  tempAverage?: {
    areas: AverageArea[];
  };
  precipAverage?: {
    areas: AverageArea[];
  };
};

export type WeatherResponseType = WeatherForecast[];

// For Area Code
export type AreaCodeType = {
  id: string;
  label: string;
};


// #region saving weather
export type WeatherSaveResponseType = {
  success: boolean;
  message: string;
}
// #endregion


// #region Get Weather Metadata

export type WeatherMetadataDataType = {
  id: string;
  company_id: string;
  area_code: string;
  sub_area_code: string;
};


// #region Get Weather Metadata
export type WeatherMetadataResponseType = {
  success: boolean;
  message: string;
  data: WeatherMetadataDataType;
};
// #endregion