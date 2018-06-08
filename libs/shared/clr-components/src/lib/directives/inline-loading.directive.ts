import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[clrInlineLoading]'
})
export class InlineLoadingDirective {
  @HostBinding('class.spinner')
  @HostBinding('class.spinner-inline')
  @Input() clrInlineLoading: boolean;

  constructor() { }

}
