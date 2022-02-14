import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appObserveVisibility]',
})
export class ObserveVisibilityDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;
  private intersectionObserverOptions = {
    rootMargin: '0px',
    threshold: 0.2,
  };

  @Output() onVisible: EventEmitter<string> = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      this.intersectionObserverCallback.bind(this),
      this.intersectionObserverOptions
    );

    this.observer.observe(this.element.nativeElement);
  }

  intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
    const { isIntersecting, target } = entries[0];
    if (isIntersecting) {
      this.onVisible.emit(target.id);
    }
  }
}
