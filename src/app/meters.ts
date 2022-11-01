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
    {
      name: 'Temperature inside',
      min: 20,
      max: 24,
      decimal: 2,
      unit: 'ºC',
      hertz: 10,
    },
    { name: 'Humidity', min: 30, max: 50, decimal: 0, unit: '%', hertz: 5 },
    { name: 'USV', min: 0, max: 1, decimal: 0, unit: '', hertz: 1 },
  ],
});
