import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-clock',
  template:
    '<p>Current Time: {{ now | date: "dd.MM.yyyy HH:mm:ss" }}</p><button class="btn-primary" (click)="handleClick()">Update</button>',
  standalone: true,
  imports: [DatePipe],
})
export class ClockComponent extends BaseComponent {
  now = new Date();
  ngOnInit() {}

  handleClick() {
    this.now = new Date();
  }
}
