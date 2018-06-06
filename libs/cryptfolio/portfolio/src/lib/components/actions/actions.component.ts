import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pflo-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  @Input() selectionCount = 0;
  @Output() addClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
}
