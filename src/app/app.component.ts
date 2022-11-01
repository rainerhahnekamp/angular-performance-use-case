import { Component, inject, OnInit } from '@angular/core';
import { METERS } from './meters';
import { Collector } from './collector';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host {display: block}'],
})
export class AppComponent extends BaseComponent implements OnInit {
  meters = inject(METERS);
  collector = inject(Collector);

  now = new Date();

  ngOnInit() {
    window.setInterval(() => (this.now = new Date()), 1000);
  }

  start() {
    this.collector.start();
  }

  stop() {
    this.collector.stop();
  }
}
