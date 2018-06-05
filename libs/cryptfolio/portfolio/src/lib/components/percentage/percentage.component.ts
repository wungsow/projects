import { Component, Input } from '@angular/core';

@Component({
  selector: 'pflo-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent {
  @Input() value: number;
}
