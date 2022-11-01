import { Component, ElementRef, inject, Input, NgZone } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { CdHighlighter } from './cd-hightlighter.service';

export type CardMeasurement = {
  name: string;
  value: number;
  date: Date;
};

@Component({
  selector: 'app-metric-card',
  styles: [':host {display: block}'],
  template:
    '<p *ngIf="measurement">{{measurement.date | date:"dd.MM.yyyy, H:mm:ss"}} <br> {{measurement.value}}</p> {{cdCheck()}}',
  standalone: true,
  imports: [DatePipe, NgIf],
})
export class MetricCardComponent {
  @Input() measurement: CardMeasurement | undefined;
  #el = inject(ElementRef);
  #cdHightlighter = inject(CdHighlighter);

  cdCheck() {
    this.#cdHightlighter.run(this.#el);
  }
}
