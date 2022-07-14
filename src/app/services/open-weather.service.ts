import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OpenWeatherForecast, OpenWeatherResponse } from '../interfaces/open-weather.interface';
import { ResponseCode } from './response-code.enum';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private apiUrl;
  private apiKey;
  private apiImgUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.openWeather.apiUrl;
    this.apiKey = environment.openWeather.apiKey;
    this.apiImgUrl = environment.openWeather.apiImgUrl;
  }

  getWeatherForecast(city: string): Observable<OpenWeatherForecast> {
    const url = `${this.apiUrl}/forecast/daily?q=${city}&cnt=1&appid=${this.apiKey}`;
    
    return this.http.get<OpenWeatherResponse>(url).pipe(
      map( response => {
         if (response.cod === ResponseCode.SUCCESS) {
          const weather: OpenWeatherForecast = response.list[0]['weather'][0];
          weather.icon = `${this.apiImgUrl}${weather.icon}.png`;
          return weather;
        }
      })

      // todo: create a method to handle errors
      // catchError(this.handleError())
    );
  }
}
