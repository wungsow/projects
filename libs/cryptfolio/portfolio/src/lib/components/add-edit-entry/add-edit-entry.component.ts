import { Coin } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PortfolioEntry, Purchase } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pflo-add-edit-entry',
  templateUrl: './add-edit-entry.component.html',
  styleUrls: ['./add-edit-entry.component.scss']
})
export class AddEditEntryComponent {
  private openValue = false;

  formGroup = new FormGroup({
    coinId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  get open() { return this.openValue; }
  @Input()
  set open(open: boolean) {
    this.openValue = open;
    this.openChange.emit(this.openValue);
  }
  @Output() openChange = new EventEmitter<boolean>();

  @Input() coins: Coin[] = [];
  @Input() set purchase(purchase: Purchase) {
    this.formGroup.patchValue(purchase);
  }

  @Output() entrySubmitted = new EventEmitter<Purchase>();
  @Output() cancelled = new EventEmitter();

  submit() {
    this.entrySubmitted.emit(this.formGroup.value);
    this.close();
  }

  close() {
    this.formGroup.reset();
    this.open = false;
  }
}
