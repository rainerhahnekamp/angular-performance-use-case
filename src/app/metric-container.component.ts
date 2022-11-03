import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Collector } from './collector';
import { CardMeasurement, MetricCardComponent } from './metric-card.component';
import {
  bufferTime,
  filter,
  map,
  mergeScan,
  Observable,
  startWith,
} from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { BaseComponent } from './base.component';
import { Meter } from './meter';

@Component({
  selector: 'app-metric-container',
  template: `
    <div *ngIf="measurement && meter" class="p-4">
      {{ hightlightCd() }}
      <h3 class="text-lg font-medium">{{ meter.name }}</h3>
      <app-metric-card
        [measurement]="measurement"
        [meterConfig]="{
          min: meter.min,
          max: meter.max,
          decimal: meter.decimal
        }"
      ></app-metric-card>
    </div>
  `,
  standalone: true,
  imports: [MetricCardComponent, NgIf, AsyncPipe],
})
export class MetricContainerComponent extends BaseComponent implements OnInit {
  @Input() meter: Meter | undefined;

  #collector = inject(Collector);

  measurement$: Observable<CardMeasurement> | undefined;
  measurement: CardMeasurement | undefined;

  ngOnInit(): void {
    this.cdr.detach();
    if (!this.meter) {
      throw new Error('name for metric is missing');
    }

    this.#collector.measurements$
      .pipe(
        startWith({
          value: NaN,
          timestamp: new Date().getTime(),
          name: this.meter.name,
        }),
        filter((measurement) => measurement.name === this.meter?.name),
        map((measurement) => ({
          ...measurement,
          date: new Date(measurement.timestamp),
        }))
      )
      .subscribe((measurement) => {
        this.measurement = measurement;
        this.cdr.detectChanges();
      });
  }

  info() {
    console.log('container');
  }
}
