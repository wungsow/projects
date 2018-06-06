import { PortfolioState, portfolioEntries, PortfolioEntry } from './../../+state/portfolio.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pflo-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioEntries$ = this.store.select(portfolioEntries);
  selected: PortfolioEntry[] = [];

  addEdit = false;

  constructor(private store: Store<PortfolioState>) { }

  ngOnInit() {
  }

  addClick() {
    this.addEdit = true;
  }

  deleteClick() {

  }

  editClick() {

  }

}
