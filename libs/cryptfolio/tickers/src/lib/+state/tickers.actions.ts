import { Ticker } from './tickers.reducer';
import { Action } from '@ngrx/store';

export enum TickersActionTypes {
  LoadTickers = '[Tickers] Load Data',
  TickersLoaded = '[Tickers] Data Loaded'
}

export class LoadTickers implements Action {
  readonly type = TickersActionTypes.LoadTickers;
  constructor(public ids: string[]) { }
}

export class TickersLoaded implements Action {
  readonly type = TickersActionTypes.TickersLoaded;
  constructor(public tickers: Ticker[]) { }
}

export type TickersActions = LoadTickers | TickersLoaded;
