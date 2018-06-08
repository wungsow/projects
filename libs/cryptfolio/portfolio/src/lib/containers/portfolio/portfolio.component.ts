import { FileManagerService } from './../../../../../../shared/file-manager/src/lib/file-manager.service';
import { UpsertEntry, DeleteEntry } from './../../+state/portfolio.actions';
import { PortfolioState, PortfolioEntry, PortfolioSummary, Purchase, portfolioEntries, loadingPortfolioEntries, portfolioSummary, getPurchases } from './../../+state/portfolio.reducer';
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
  entriesLoading = true;
  summary: PortfolioSummary;

  selected: PortfolioEntry;
  showAddEdit = false;
  purchaseToEdit: Purchase;
  purchaseToDelete: Purchase;

  constructor(private store: Store<PortfolioState>, private fileManagerService: FileManagerService) { }

  ngOnInit() {
    this.store.select(portfolioSummary).subscribe(summary => this.summary = summary);
    this.store.select(loadingPortfolioEntries).subscribe(loading => this.entriesLoading = loading);
  }

  addEditClick(purchase) {
    this.purchaseToEdit = purchase ? purchase : null;
    this.showAddEdit = true;
  }

  addSubmit(purchase: Purchase) {
    this.store.dispatch(new UpsertEntry(purchase));
  }

  deleteClick(entry: PortfolioEntry) {
    this.purchaseToDelete = entry;
  }

  deleteSubmit(entry: PortfolioEntry) {
    this.store.dispatch(new DeleteEntry(entry.id));
  }

  exportClick() {
    this.store.select(getPurchases).subscribe(purchases =>
      this.fileManagerService.saveJsonToFile(purchases, `portfolio-${new Date().toISOString()}.json`));
  }

  importClick() {

  }
}
