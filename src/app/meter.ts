import { InjectionToken } from '@angular/core';

export type Meter = {
  name: string;
  min: number;
  max: number;
  decimal: number;
  unit: string;
  hertz: number;
};
