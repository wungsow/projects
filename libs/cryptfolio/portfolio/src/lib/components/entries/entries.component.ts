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

  getChange({ price, quote }: PortfolioEntry): number {
    const currentPrice = quote && quote.price;

    return price && currentPrice && Math.round(100 * (currentPrice - price) / price);
  }
}
