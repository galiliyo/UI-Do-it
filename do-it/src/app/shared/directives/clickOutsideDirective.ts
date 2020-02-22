import {Directive, Input, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();
@Input() excludeElements: string[];
  constructor(private elementRef: ElementRef) {
    this.excludeElements = [];
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    this.excludeElements.forEach(elm => {

    })

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
