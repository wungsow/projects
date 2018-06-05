import { TickersData } from './../../../../tickers/src/lib/+state/tickers.reducer';
import { Coin, CoinsState } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { Action, createSelector } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes, LoadPortfolio } from './portfolio.actions';
import { TickersState, Ticker } from '@projects/cryptfolio/tickers/src/lib/+state/tickers.reducer';
import { AsyncState } from '@projects/shared/static/src/lib/+state/async-state';

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
  readonly portfolio: AsyncState<PortfolioData>;
}

export interface PortfolioEntry extends Purchase {
  coinData: Ticker;
}

export const initialState: AsyncState<PortfolioData> = { loading: false, data: {} };

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions
): AsyncState<PortfolioData> {
  switch (action.type) {
    case PortfolioActionTypes.PortfolioLoaded: {
      return { ...state, data: { ...action.payload }, loading: false };
    }

    case PortfolioActionTypes.LoadPortfolio: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}

export const portfolioEntries = createSelector([(state: PortfolioState) => state.portfolio, (state: PortfolioState) => state.tickers], getPortfolioEntries);

function getPortfolioEntries(portfolio: AsyncState<PortfolioData>, tickers: AsyncState<TickersData>): AsyncState<PortfolioEntry[]> {
  const loading = portfolio.loading || tickers.loading,
    entries: Purchase[] = portfolio.data && !loading ? Object.values(portfolio.data) : [],
    data = entries.map(portfolioEntry => ({ ...portfolioEntry, coinData: tickers.data && tickers.data[portfolioEntry.coinId] }));
  return { loading, data };
}
