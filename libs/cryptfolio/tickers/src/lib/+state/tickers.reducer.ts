import { Action } from '@ngrx/store';
import { TickersActions, TickersActionTypes } from './tickers.actions';

/**
 * Interface for the 'Tickers' data used in
 *  - TickersState, and
 *  - tickersReducer
 */
export interface TickersData {}

/**
 * Interface to the part of the Store containing TickersState
 * and other information related to TickersData.
 */
export interface TickersState {
  readonly tickers: TickersData;
}

export const initialState: TickersData = {};

export function tickersReducer(
  state = initialState,
  action: TickersActions
): TickersData {
  switch (action.type) {
    case TickersActionTypes.TickersAction:
      return state;

    case TickersActionTypes.TickersLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
