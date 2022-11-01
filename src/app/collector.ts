import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Measurement } from './measurement';
import { METERS } from './meters';
import { Meter } from './meter';
import { Logger } from './logger.service';

@Injectable({ providedIn: 'root' })
export class Collector {
  readonly lastRuns = new Map<string, number>();
  hertz = 10;

  #meters = inject(METERS); //.filter((meter) => meter.name === 'USV');
  #logger = inject(Logger);
  #measurements$ = new Subject<Measurement>();
  status: 'stopped' | 'running' = 'stopped';
  #intervalId = 0;
  readonly measurements$ = this.#measurements$.asObservable();

  start() {
    if (this.status === 'running') {
      return;
    }
    this.status = 'running';
    this.#intervalId = window.setInterval(
      () => this.#emitEvents(),
      1000 / this.hertz
    );
  }

  stop() {
    if (this.status === 'stopped') {
      return;
    }

    this.status = 'stopped';
    window.clearInterval(this.#intervalId);
  }

  #emitEvents() {
    const now = new Date().getTime();
    for (const meter of this.#meters) {
      const lastRun = this.lastRuns.get(meter.name);
      if (!lastRun) {
        this.#emit(meter, now);
      } else {
        const elapsed = now - lastRun;
        const threshold = 1000 / meter.hertz;
        if (elapsed > threshold) {
          this.#emit(meter, now);
        }
      }
    }
  }

  #emit(meter: Meter, now: number) {
    this.lastRuns.set(meter.name, now);
    const base = Math.pow(10, meter.decimal);
    const range = meter.max - meter.min;
    const value = Math.round(Math.random() * range * base) / base;
    const measurement: Measurement = {
      name: meter.name,
      value: meter.min + value,
      timestamp: now,
    };

    console.log('emitting: %o', measurement);
    this.#measurements$.next(measurement);
  }
}
