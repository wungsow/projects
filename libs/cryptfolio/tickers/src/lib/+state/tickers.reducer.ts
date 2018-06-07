import { Action } from '@ngrx/store';
import { TickersActions, TickersActionTypes } from './tickers.actions';
import { AsyncState } from '@projects/shared/static/src';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';

/**
 * Interface for the 'Tickers' data used in
 *  - TickersState, and
 *  - tickersReducer
 */
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
  readonly tickers: Tickers;
}

export interface Tickers extends EntityState<Ticker> {
  loading: boolean;
}

const adapter: EntityAdapter<Ticker> = createEntityAdapter<Ticker>();

export const initialState: Tickers = adapter.getInitialState({ loading: false });

export function tickersReducer(
  state = initialState,
  action: TickersActions
): Tickers {
  switch (action.type) {

    case TickersActionTypes.TickersLoaded: {
      const updates: Update<Ticker>[] = action.tickers.map(ticker => ({ id: ticker.id, changes: ticker }));
      return adapter.upsertMany(updates, { ...state, loading: false });
    }

    case TickersActionTypes.LoadTickers: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
