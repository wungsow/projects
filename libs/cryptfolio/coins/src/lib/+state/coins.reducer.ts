import { LoadCoins } from '@projects/cryptfolio/coins/src/lib/+state/coins.actions';
import { Action } from '@ngrx/store';
import { CoinsActions, CoinsActionTypes } from './coins.actions';
import { AsyncState } from '@projects/shared/static/src/lib/+state/async-state';

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
  readonly coins: AsyncState<Coin[]>;
}

export const initialState: AsyncState<Coin[]> = { loading: false, data: [] };

export function coinsReducer(state = initialState, action: CoinsActions): AsyncState<Coin[]> {
  switch (action.type) {
    case CoinsActionTypes.CoinsLoaded: {
      return { ...state, data: JSON.parse(JSON.stringify(action.payload)), loading: false };
    }

    case CoinsActionTypes.LoadCoins: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}
