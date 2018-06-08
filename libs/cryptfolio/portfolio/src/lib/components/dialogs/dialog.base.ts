import { Component, Input, Output, EventEmitter } from '@angular/core';

export abstract class DialogBase {

  private openValue: any;

  get open() { return this.openValue; }
  @Input()
  set open(open: any) {
    this.openValue = open;
    this.openChange.emit(this.openValue);
  }
  @Output() openChange = new EventEmitter<any>();

  close() {
    this.open = null;
  }
}
