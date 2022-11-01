import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { BaseComponent } from './base.component';
import Gauge, { GaugeInstance } from 'svg-gauge';

export type CardMeasurement = {
  name: string;
  value: number;
  date: Date;
};

export type MeterConfig = {
  min: number;
  max: number;
  decimal: number;
};

@Component({
  selector: 'app-metric-card',
  styles: [':host {display: block}'],
  templateUrl: 'metric-card.component.html',
  standalone: true,
  imports: [DatePipe, NgIf],
})
export class MetricCardComponent
  extends BaseComponent
  implements OnChanges, AfterViewInit
{
  @Input() meterConfig: MeterConfig | undefined;
  @Input() measurement: CardMeasurement | undefined;
  @ViewChild('gauge') gaugeContaner: ElementRef | undefined;

  gauge: GaugeInstance | undefined;

  ngAfterViewInit() {
    if (!this.meterConfig) {
      throw new Error('config is missing');
    }

    if (!this.gaugeContaner) {
      throw new Error('coult not find container to render gauge');
    }

    const range = this.meterConfig.max - this.meterConfig.min;
    const greenRange = this.meterConfig.min + range * 0.3;
    const yellowRange = this.meterConfig.min + range * 0.6;
    const redRange = this.meterConfig.min + range * 0.9;

    this.gauge = Gauge(this.gaugeContaner.nativeElement, {
      min: this.meterConfig.min,
      max: this.meterConfig.max,
      dialStartAngle: 180,
      dialEndAngle: 0,

      label: (value: number) => value.toFixed(this.meterConfig?.decimal),
      color: (value: number) => {
        if (value < greenRange) {
          return '#5ee432'; // green
        } else if (value < yellowRange) {
          return '#fffa50'; // yellow
        } else if (value < redRange) {
          return '#f7aa38'; // orange
        } else {
          return '#ef4655'; // red
        }
      },
    });

    if (this.measurement) {
      this.gauge.setValue(this.measurement.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.measurement && this.gauge) {
      this.gauge.setValue(this.measurement.value);
    }
  }
}
