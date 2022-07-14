
export interface OpenWeatherResponse {
  city?: object;
  cnt?: number;
  cod: string;
  list?: Array<'T'>;
  message: number
}

export interface OpenWeatherForecast {
  description: string;
  icon: string;
  id: number
  main: string;
}