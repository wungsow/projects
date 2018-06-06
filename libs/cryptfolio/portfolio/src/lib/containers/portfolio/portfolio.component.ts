import { UpsertEntry } from './../../+state/portfolio.actions';
import { PortfolioState, portfolioEntries, PortfolioEntry, Purchase } from './../../+state/portfolio.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pflo-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioEntries$ = this.store.select(portfolioEntries);
  coinList$ = this.store.select(portfolio => portfolio.coins.data);
  selected: PortfolioEntry[] = [];

  addEdit = false;

  constructor(private store: Store<PortfolioState>) { }

  ngOnInit() {
  }

  addClick() {
    this.addEdit = true;
  }

  addSubmit(purchase: Purchase) {
    this.store.dispatch(new UpsertEntry(purchase));
  }

  deleteClick() {

  }

  editClick() {

  }

}
