import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogBase } from '../dialog.base';

@Component({
  selector: 'pflo-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.scss']
})
export class DeleteEntryComponent extends DialogBase {
  @Output() deleteSubmitted = new EventEmitter();

  submit() {
    this.deleteSubmitted.emit(this.open);
    this.close();
  }
}
