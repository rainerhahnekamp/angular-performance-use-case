import { InjectionToken } from '@angular/core';
import { Meter } from './meter';

export const METERS = new InjectionToken<Meter[]>('measurement config', {
  providedIn: 'root',
  factory: () => [
    {
      name: 'Temperature outside',
      min: 8,
      max: 18,
      decimal: 1,
      unit: 'ºC',
      hertz: 1 / 5,
    },
    {
      name: 'Pressure',
      min: 2.25,
      max: 2.75,
      decimal: 2,
      unit: 'bar',
      hertz: 2,
    },
    { name: 'Humidity', min: 30, max: 50, decimal: 0, unit: '%', hertz: 5 },
  ],
});
