import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Weather } from './models';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //step1
  form!: FormGroup;
  //2.7
  weather: Weather[] = [];
  //2.7 for observable
  weather$!: Observable<Weather[]>;

  //step1
  //2.7 add weatherSvc in constructor
  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) {}

  //step1
  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control('', [Validators.required]),
    });
  }

  //step1
  getWeather() {
    const city = this.form.value.city;
    console.info('>>> city: ', city);

    //populate the array of weather:
    // this.weatherSvc.getWeather(city)
    //   .then(result => {
    //     this.weather = result
    //     console.info('>>> weather: ', this.weather)
    //     this.form.reset()
    //   })
    //   .catch(error => {
    //     console.info('>>> error: ', error)
    //   })

    //this.weather$ = this.weatherSvc.getWeatherAsObservable(city)

    //this is a promise so there is no need to subscribe
    this.weatherSvc.getWeather(city);
  }
}
