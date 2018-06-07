import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'clr-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  @Input() label: string;
  @Input() validationMsg: string;
  @Input() control: FormControl;

  get formGroup() {
    return this.control ? this.control.parent : null;
  }

  /** The name of this control in the form */
  get controlName(): string {
    if (this.formGroup && this.formGroup.controls) {
      return Object.keys(this.formGroup.controls)
        .find(controlName => this.formGroup.controls[controlName] === this.control);
    }
  }
}
