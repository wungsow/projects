import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioEntry } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';

@Component({
  selector: 'pflo-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinComponent {
  @Input() coin: PortfolioEntry;
  get src() {
    return `https://s2.coinmarketcap.com/static/img/coins/16x16/${this.coin.coinId}.png`;
  }
}
