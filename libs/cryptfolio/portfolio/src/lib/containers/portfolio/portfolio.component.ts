import { PortfolioState, portfolioEntries } from './../../+state/portfolio.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'projects-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioEntries$ = this.store.select(portfolioEntries);

  constructor(private store: Store<PortfolioState>) { }

  ngOnInit() {
  }

}
