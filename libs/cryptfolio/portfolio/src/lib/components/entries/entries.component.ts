import { PortfolioEntry } from './../../+state/portfolio.reducer';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pflo-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent {
  private _selected: PortfolioEntry[] = [];

  @Input() loading = true;
  @Input() entries: PortfolioEntry[];

  get selected(): PortfolioEntry[] { return this._selected; }
  @Input() set selected(selected: PortfolioEntry[]) {
    this._selected = selected;
    this.selectedChange.emit(selected);
  }
  @Output() selectedChange = new EventEmitter();
}
