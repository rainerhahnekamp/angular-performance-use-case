import { ElementRef, inject, Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CdHighlighter {
  ngZone = inject(NgZone);
  disabled = false;

  run(el: ElementRef) {
    if (this.disabled) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      el.nativeElement.style.backgroundColor = 'coral';
      window.setTimeout(() => {
        el.nativeElement.style.background = 'white';
      }, 250);
    });
  }
}
