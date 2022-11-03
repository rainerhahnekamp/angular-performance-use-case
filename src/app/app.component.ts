import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { METERS } from './meters';
import { Collector } from './collector';
import { BaseComponent } from './base.component';
import { CdHighlighter } from './cd-hightlighter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host {display: block}'],
})
export class AppComponent extends BaseComponent {
  meters = inject(METERS);
  collector = inject(Collector);
  override cdHighlighter = inject(CdHighlighter);

  now = new Date();

  start() {
    this.collector.start();
  }

  stop() {
    this.collector.stop();
  }

  triggerCd() {
    this.cdr.detectChanges();
  }
}
