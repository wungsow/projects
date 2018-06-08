import { PortfolioEntry } from './../../+state/portfolio.reducer';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

@Component({
  selector: 'pflo-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent {

  @Input() loading = true;
  @Input() entries: PortfolioEntry[];

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  trackEntry(index, entry) {
    return entry.id;
  }
}
