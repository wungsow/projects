import { Component, Input, Output, EventEmitter } from '@angular/core';

export abstract class DialogBase {

  private openValue = false;

  get open() { return this.openValue; }
  @Input()
  set open(open: boolean) {
    this.openValue = open;
    this.openChange.emit(this.openValue);
  }
  @Output() openChange = new EventEmitter<boolean>();

  close() {
    this.open = false;
  }
}
