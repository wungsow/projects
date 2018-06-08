import { PortfolioSummary } from './../../+state/portfolio.reducer';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pflo-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() summary: PortfolioSummary;
  @Input() loading = true;
}
