import { TickersData } from './../../../../tickers/src/lib/+state/tickers.reducer';
import { Coin, CoinsState } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { Action, createSelector } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions';
import { TickersState, Ticker } from '@projects/cryptfolio/tickers/src/lib/+state/tickers.reducer';

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
export interface PortfolioState extends CoinsState, TickersState {
  readonly portfolio: PortfolioData;
}

export interface PortfolioEntry extends Purchase {
  coinData: Ticker;
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

export const portfolioEntries = createSelector([(state: PortfolioState) => state.portfolio, (state: PortfolioState) => state.tickers], getPortfolioEntries);

function getPortfolioEntries(portfolio: PortfolioData, tickers: TickersData): PortfolioEntry[] {
  const entries: Purchase[] = portfolio ? Object.values(portfolio) : [];
  return entries.map(portfolioEntry => ({ ...portfolioEntry, coinData: tickers && tickers[portfolioEntry.coinId] }));
}
