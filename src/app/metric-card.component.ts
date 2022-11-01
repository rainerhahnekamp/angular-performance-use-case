import { Component, Input } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { BaseComponent } from './base.component';

export type CardMeasurement = {
  name: string;
  value: number;
  date: Date;
};

@Component({
  selector: 'app-metric-card',
  styles: [':host {display: block}'],
  template:
    '<p *ngIf="measurement">{{measurement.date | date:"dd.MM.yyyy, H:mm:ss"}} <br> {{measurement.value}}</p> {{hightlightCd()}}',
  standalone: true,
  imports: [DatePipe, NgIf],
})
export class MetricCardComponent extends BaseComponent {
  @Input() measurement: CardMeasurement | undefined;
}
