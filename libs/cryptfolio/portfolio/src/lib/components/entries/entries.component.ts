import { PortfolioEntry } from './../../+state/portfolio.reducer';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pflo-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent {
  @Input() loading = true;
  @Input() entries: PortfolioEntry[];
  constructor() { }
}
