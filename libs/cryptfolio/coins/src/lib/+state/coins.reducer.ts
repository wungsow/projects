import { Action } from '@ngrx/store';
import { CoinsActions, CoinsActionTypes } from './coins.actions';

/**
 * Interface for the 'Coins' data used in
 *  - CoinsState, and
 *  - coinsReducer
 */
export interface CoinsData {}

/**
 * Interface to the part of the Store containing CoinsState
 * and other information related to CoinsData.
 */
export interface CoinsState {
  readonly coins: CoinsData;
}

export const initialState: CoinsData = {};

export function coinsReducer(
  state = initialState,
  action: CoinsActions
): CoinsData {
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
