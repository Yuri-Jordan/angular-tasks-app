import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: false
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
