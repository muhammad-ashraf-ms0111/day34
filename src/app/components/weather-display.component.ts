import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
})
//2.9 create this component to display weather
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  weather$!: Observable<Weather[]>;
  //2.12
  weather: Weather[] = [];
  weatherSub!: Subscription;

  //2.11
  constructor(private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    console.info('>> subscribing to weather');

    //2.12 returns a subscription
    this.weatherSub = this.weatherSvc.onWeather.subscribe(
      (data) => (this.weather = data)
    );

    //2.12 observable that returns weather array (alternative to subscribe)
    //this.weather$ = this.weatherSvc.onWeather.asObservable()
  }

  //2.12
  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }
}
