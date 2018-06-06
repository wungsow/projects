import { Currency } from './curency.enum';
import { CoinsState } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { createSelector } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions';
import { TickersState, Quote, TickersData } from '@projects/cryptfolio/tickers/src/lib/+state/tickers.reducer';
import { AsyncState } from '@projects/shared/static/src/lib/+state/async-state';
import { Utils } from '@projects/shared/static/src';

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
  change: number;
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

    case PortfolioActionTypes.UpsertEntry: {
      const id = Utils.isDefined(action.payload.id) ? action.payload.id : Utils.getNewId(Object.keys(state.data));
      return { ...state, data: { ...state.data, [id]: action.payload } };
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
    quote = ticker && ticker.quotes[currency],
    change = getChange(purchase.price, quote);

  return { ...purchase, name, symbol, quote, change };
}

function getChange(price, quote: Quote): number {
  const currentPrice = quote && quote.price;

  return price && currentPrice ? Math.round(100 * (currentPrice - price) / price) : null;
}
