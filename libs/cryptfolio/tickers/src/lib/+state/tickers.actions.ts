import { Action } from '@ngrx/store';

export enum TickersActionTypes {
  TickersAction = '[Tickers] Action',
  LoadTickers = '[Tickers] Load Data',
  TickersLoaded = '[Tickers] Data Loaded'
}

export class Tickers implements Action {
  readonly type = TickersActionTypes.TickersAction;
}
export class LoadTickers implements Action {
  readonly type = TickersActionTypes.LoadTickers;
  constructor(public payload: any) {}
}

export class TickersLoaded implements Action {
  readonly type = TickersActionTypes.TickersLoaded;
  constructor(public payload: any) {}
}

export type TickersActions = Tickers | LoadTickers | TickersLoaded;
