import { AsyncState } from './../../../../../shared/static/src/lib/+state/async-state';
import { Action } from '@ngrx/store';
import { TickersActions, TickersActionTypes, LoadTickers } from './tickers.actions';

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
  readonly tickers: AsyncState<TickersData>;
}

export const initialState: AsyncState<TickersData> = { loading: false, data: {} };

export function tickersReducer(
  state = initialState,
  action: TickersActions
): AsyncState<TickersData> {
  switch (action.type) {

    case TickersActionTypes.TickersLoaded: {
      return { ...state, data: { ...action.payload }, loading: false };
    }

    case TickersActionTypes.LoadTickers: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}
