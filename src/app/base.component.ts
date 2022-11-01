import { ChangeDetectorRef, ElementRef, inject, NgZone } from '@angular/core';
import { CdHighlighter } from './cd-hightlighter.service';

export class BaseComponent {
  protected el = inject(ElementRef);
  protected cdr = inject(ChangeDetectorRef);
  protected cdHighlighter = inject(CdHighlighter);
  protected ngZone = inject(NgZone);

  hightlightCd() {
    this.cdHighlighter.run(this.el);
  }
}
