import { Action } from '@ngrx/store';

export enum CoinsActionTypes {
  CoinsAction = '[Coins] Action',
  LoadCoins = '[Coins] Load Data',
  CoinsLoaded = '[Coins] Data Loaded'
}

export class Coins implements Action {
  readonly type = CoinsActionTypes.CoinsAction;
}
export class LoadCoins implements Action {
  readonly type = CoinsActionTypes.LoadCoins;
  constructor(public payload: any) {}
}

export class CoinsLoaded implements Action {
  readonly type = CoinsActionTypes.CoinsLoaded;
  constructor(public payload: any) {}
}

export type CoinsActions = Coins | LoadCoins | CoinsLoaded;
