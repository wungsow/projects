import { Ticker } from './tickers.reducer';
import { Action } from '@ngrx/store';

export enum TickersActionTypes {
  LoadTickers = '[Tickers] Load Data',
  TickersLoaded = '[Tickers] Data Loaded'
}

export class LoadTickers implements Action {
  readonly type = TickersActionTypes.LoadTickers;
}

export class TickersLoaded implements Action {
  readonly type = TickersActionTypes.TickersLoaded;
  constructor(public payload: { [id: string]: Ticker }) { }
}

export type TickersActions = LoadTickers | TickersLoaded;
