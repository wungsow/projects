import { CoinsState } from './../../../../coins/src/lib/+state/coins.reducer';
import { Coin } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { Action } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions';

/**
 * Interface for the 'Portfolio' data used in
 *  - PortfolioState, and
 *  - portfolioReducer
 */
export interface PortfolioData {
  [id: string]: Purchase;
}

export interface Purchase {
  id: number;
  coinId: number;
  amount: number;
  price: number;
}

/**
 * Interface to the part of the Store containing PortfolioState
 * and other information related to PortfolioData.
 */
export interface PortfolioState extends CoinsState {
  readonly portfolio: PortfolioData;
}

export const initialState: PortfolioData = {};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions
): PortfolioData {
  switch (action.type) {
    case PortfolioActionTypes.PortfolioLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
