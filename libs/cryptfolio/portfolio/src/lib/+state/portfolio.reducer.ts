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
  purchases: { [id: string]: Purchase };
  tickers: { [id: string]: Ticker };
}

export interface Ticker extends Coin {
  quotes: { [currency: string]: Quote }
}

export interface Quote {
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
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

export const initialState: PortfolioData = {
  purchases: {},
  tickers: {}
};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions
): PortfolioData {
  switch (action.type) {
    case PortfolioActionTypes.PortfolioAction:
      return state;

    case PortfolioActionTypes.PortfolioLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
