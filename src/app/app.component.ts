import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { METERS } from './meters';
import { Collector } from './collector';
import { CdHighlighter } from './cd-hightlighter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host {display: block}'],
})
export class AppComponent implements OnInit {
  meters = inject(METERS);
  collector = inject(Collector);
  #el = inject(ElementRef);
  cdHighlighter = inject(CdHighlighter);
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

  cdCheck() {
    this.cdHighlighter.run(this.#el);
  }
}
