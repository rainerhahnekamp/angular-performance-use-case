import { ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { CdHighlighter } from './cd-hightlighter.service';

export class BaseComponent {
  protected el = inject(ElementRef);
  protected cdr = inject(ChangeDetectorRef);
  protected cdHighlighter = inject(CdHighlighter);

  hightlightCd() {
    this.cdHighlighter.run(this.el);
  }
}
