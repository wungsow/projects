import { PortfolioEntry } from './../../+state/portfolio.reducer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pflo-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  @Input() entry: PortfolioEntry;
  constructor() { }
}
