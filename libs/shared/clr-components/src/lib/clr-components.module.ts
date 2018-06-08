import { InlineLoadingDirective } from './directives/inline-loading.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control/form-control.component';
@NgModule({
  imports: [CommonModule],
  declarations: [FormControlComponent, InlineLoadingDirective],
  exports: [FormControlComponent, InlineLoadingDirective]
})
export class ClrComponentsModule { }
