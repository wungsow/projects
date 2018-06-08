import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pflo-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  @Output() addClick = new EventEmitter();
  @Output() exportClick = new EventEmitter();
  @Output() importClick = new EventEmitter();
}
