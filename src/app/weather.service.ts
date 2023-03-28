//step2

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, Subject, tap } from 'rxjs';
import { Weather } from './models';

//2.4
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APPID = '__YOUR_KEY_HERE__';

@Injectable() //2.1service needs to be annotated with injectable and WeatherService in appmodule [provider]
export class WeatherService {
  //2.10
  onWeather = new Subject<Weather[]>();

  //2.2 add HttpClient. Import in appmodule
  constructor(private http: HttpClient) {}

  //2.3 return an observable and add HttpParams.
  getWeatherAsObservable(city: string): Observable<Weather[]> {
    const params = new HttpParams()
      //url parameters:
      .set('q', city)
      .set('units', 'metric')
      .set('appid', APPID);

    //2.5 make a call after creating a model
    //return weather array
    return this.http
      .get<Weather[]>(WEATHER_URL, { params }) //{params: params} in JS, if key name is the same as value, can reduce to {params}
      .pipe
      //code below is to return weather only:
      // map((data:any) => {
      // console.info('>>>> in map')
      // return data['weather'] as Weather[]
      // }),

      //2.10 for weather display component to get data
      // tap(data => {
      //   console.info('>>>> data: ', data)
      //   this.onWeather.next(data)
      // })
      ();
  }

  //2.3 return a promise
  getWeather(city: string): Promise<Weather[]> {
    return firstValueFrom(this.getWeatherAsObservable(city)).then(
      (data: any) => {
        // equivalent to map() and tap()
        const w = data['weather'] as Weather[];
        this.onWeather.next(w);
        return w;
      }
    );

    // .then((data) => {
    //   this.onWeather.next(data);
    //   return data;
    // });
  }
}
