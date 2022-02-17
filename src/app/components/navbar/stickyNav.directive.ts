import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStickyNav]',
})
export class StickyNavDirective {
  constructor(private element: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  handleScroll(e: Event) {
    e.stopPropagation();

    console.log(window.innerHeight);
    console.log(window.scrollY);

    if (window.scrollY > 0) {
      this.element.nativeElement.classList.add('sticky');
    } else {
      this.element.nativeElement.classList.remove('sticky');
    }
  }
}
