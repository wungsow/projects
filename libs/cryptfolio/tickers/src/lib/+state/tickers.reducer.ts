import { Action } from '@ngrx/store';
import { TickersActions, TickersActionTypes } from './tickers.actions';
import { AsyncState } from '@projects/shared/static/src';

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
      return { ...state, data: { ...state.data, ...action.payload }, loading: false };
    }

    case TickersActionTypes.LoadTickers: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}
