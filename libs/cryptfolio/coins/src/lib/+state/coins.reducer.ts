import { Action } from '@ngrx/store';
import { CoinsActions, CoinsActionTypes } from './coins.actions';

/**
 * Interface for the 'Coins' data used in
 *  - CoinsState, and
 *  - coinsReducer
 */
export interface Coin {
  id: number;
  name: string;
  symbol: string;
}

/**
 * Interface to the part of the Store containing CoinsState
 * and other information related to CoinsData.
 */
export interface CoinsState {
  readonly coins: Coin[];
}

export const initialState: Coin[] = [];

export function coinsReducer(
  state = initialState,
  action: CoinsActions
): Coin[] {
  switch (action.type) {
    case CoinsActionTypes.CoinsAction:
      return state;

    case CoinsActionTypes.CoinsLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
