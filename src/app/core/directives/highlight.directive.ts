import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private render: Renderer2,
    private elementRef: ElementRef) { }

  @HostListener('mouseenter', ['$event']) onMouseEnter(e: any) {
    this.render.addClass(this.elementRef.nativeElement, 'active');
  }

  @HostListener('mouseleave') onMouseLeaver() {
    this.render.removeClass(this.elementRef.nativeElement, 'active');
  }
}
