import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { Collector } from './collector';
import { CardMeasurement, MetricCardComponent } from './metric-card.component';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Measurement } from './meaurement';
import { CdHighlighter } from './cd-hightlighter.service';

@Component({
  selector: 'app-metric-container',
  template: `
    <div *ngIf="measurement" class="p-4">
      {{ cdCheck() }}
      <h3 class="text-lg font-medium">{{ name }}</h3>
      <app-metric-card [measurement]="measurement"></app-metric-card>
    </div>
  `,
  standalone: true,
  imports: [MetricCardComponent, NgIf, AsyncPipe],
})
export class MetricContainerComponent implements OnInit {
  @Input() name = '';

  #collector = inject(Collector);
  #el = inject(ElementRef);
  #cdHighlighter = inject(CdHighlighter);

  measurement$: Observable<CardMeasurement> | undefined;
  measurement: CardMeasurement = {
    value: NaN,
    date: new Date(),
    name: this.name,
  };

  ngOnInit(): void {
    if (this.name === '') {
      throw new Error('name for metric is missing');
    }

    this.#collector.measurements$
      .pipe(
        filter((measurement) => measurement.name === this.name),
        map((measurement) => ({
          ...measurement,
          date: new Date(measurement.timestamp),
        }))
      )
      .subscribe((value) => (this.measurement = value));
  }

  cdCheck() {
    this.#cdHighlighter.run(this.#el);
  }
}
