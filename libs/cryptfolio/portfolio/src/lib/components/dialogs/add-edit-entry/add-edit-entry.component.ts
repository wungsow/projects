import { DialogBase } from '../dialog.base';
import { Coin } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PortfolioEntry, Purchase } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pflo-add-edit-entry',
  templateUrl: './add-edit-entry.component.html',
  styleUrls: ['./add-edit-entry.component.scss']
})
export class AddEditEntryComponent extends DialogBase {

  get desc() { return this.formGroup.get('id').value ? 'Update' : 'Add'; }

  get amountControl() { return this.formGroup.get('amount'); }

  formGroup = new FormGroup({
    coinId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  @Input() coins: Coin[] = [];
  @Input() set purchase(purchase: Purchase) {
    this.formGroup.reset();
    if (purchase) {
      this.formGroup.patchValue(purchase);
    }
  }

  @Output() entrySubmitted = new EventEmitter<Purchase>();
  @Output() cancelled = new EventEmitter();

  submit() {
    this.entrySubmitted.emit(this.formGroup.value);
    this.formGroup.reset();
    this.close();
  }
}
