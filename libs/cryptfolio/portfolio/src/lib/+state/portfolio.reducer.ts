import { Currency } from './curency.enum';
import { TickersData, Quote } from './../../../../tickers/src/lib/+state/tickers.reducer';
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
  readonly portfolio: Portfolio;
}

export interface Portfolio extends AsyncState<PortfolioData> {
  currency: Currency
}

export interface PortfolioEntry extends Purchase {
  name: string;
  symbol: string;
  quote: Quote;
}

export const initialState: Portfolio = { loading: false, data: {}, currency: Currency.USD };

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions
): Portfolio {
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

function getPortfolioEntries(portfolio: Portfolio, tickers: AsyncState<TickersData>): AsyncState<PortfolioEntry[]> {
  const loading = portfolio.loading || tickers.loading,
    entries: Purchase[] = portfolio.data && !loading ? Object.values(portfolio.data) : [],
    data = entries.map(portfolioEntry => createPortfolioEntry(portfolioEntry, tickers.data, portfolio.currency));
  return { loading, data };
}

function createPortfolioEntry(purchase: Purchase, tickers: TickersData, currency: Currency): PortfolioEntry {
  const ticker = tickers[purchase.coinId],
    { name, symbol } = { ...ticker },
    quote = ticker && ticker.quotes[currency];

  return { ...purchase, name, symbol, quote };
}
