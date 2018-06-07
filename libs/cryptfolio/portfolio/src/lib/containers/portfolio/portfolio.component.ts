import { UpsertEntry, DeleteEntry } from './../../+state/portfolio.actions';
import { PortfolioState, PortfolioEntry, Purchase, portfolioEntries, loadingPortfolioEntries } from './../../+state/portfolio.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pflo-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  // Store data
  coinList$ = this.store.select(portfolio => portfolio.coins.data);
  portfolioEntries$ = this.store.select(portfolioEntries);
  entriesLoading$ = this.store.select(loadingPortfolioEntries);

  selected: PortfolioEntry;
  showAddEdit = false;
  showDelete = false;
  purchaseToEdit: Purchase;

  constructor(private store: Store<PortfolioState>) { }

  ngOnInit() {
  }

  addEditClick(purchase) {
    this.purchaseToEdit = purchase ? purchase : null;
    this.showAddEdit = true;
  }

  addSubmit(purchase: Purchase) {
    this.store.dispatch(new UpsertEntry(purchase));
  }

  deleteClick() {
    this.showDelete = true;
  }

  deleteSubmit() {
    this.store.dispatch(new DeleteEntry(this.selected.id));
  }
}
