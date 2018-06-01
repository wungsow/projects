import { Coin } from './coins.reducer';
import { Action } from '@ngrx/store';

export enum CoinsActionTypes {
  LoadCoins = '[Coins] Load Data',
  CoinsLoaded = '[Coins] Data Loaded'
}

export class LoadCoins implements Action {
  readonly type = CoinsActionTypes.LoadCoins;
}

export class CoinsLoaded implements Action {
  readonly type = CoinsActionTypes.CoinsLoaded;
  constructor(public payload: Coin[]) { }
}

export type CoinsActions = LoadCoins | CoinsLoaded;
