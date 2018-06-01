import { Action } from '@ngrx/store';
import { TickersActions, TickersActionTypes } from './tickers.actions';

/**
 * Interface for the 'Tickers' data used in
 *  - TickersState, and
 *  - tickersReducer
 */
export interface TickersData {
  [id: string]: Ticker;
}

export interface Ticker {
  id: number;
  name: string;
  symbol: string;
  quotes: { [currency: string]: Quote }
}

export interface Quote {
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
}

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

    case TickersActionTypes.TickersLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
