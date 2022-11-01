import { Component, inject, Input, OnInit } from '@angular/core';
import { Collector } from './collector';
import { CardMeasurement, MetricCardComponent } from './metric-card.component';
import { filter, map, Observable, startWith } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-metric-container',
  template: `
    <div *ngIf="measurement" class="p-4">
      {{ hightlightCd() }}
      <h3 class="text-lg font-medium">{{ name }}</h3>
      <app-metric-card [measurement]="measurement"></app-metric-card>
    </div>
  `,
  standalone: true,
  imports: [MetricCardComponent, NgIf, AsyncPipe],
})
export class MetricContainerComponent extends BaseComponent implements OnInit {
  @Input() name = '';

  #collector = inject(Collector);

  measurement$: Observable<CardMeasurement> | undefined;
  measurement: CardMeasurement | undefined;

  ngOnInit(): void {
    if (this.name === '') {
      throw new Error('name for metric is missing');
    }

    this.#collector.measurements$
      .pipe(
        startWith({
          value: NaN,
          timestamp: new Date().getTime(),
          name: this.name,
        }),
        filter((measurement) => measurement.name === this.name),
        map((measurement) => ({
          ...measurement,
          date: new Date(measurement.timestamp),
        }))
      )
      .subscribe((value) => (this.measurement = value));
  }
}
