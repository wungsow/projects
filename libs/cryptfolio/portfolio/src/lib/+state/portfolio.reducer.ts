import { Currency } from './curency.enum';
import { CoinsState } from '@projects/cryptfolio/coins/src/lib/+state/coins.reducer';
import { createSelector } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions';
import { TickersState, Quote, Tickers, selectEntities as selectTickers } from '@projects/cryptfolio/tickers/src/lib/+state/tickers.reducer';
import { AsyncState } from '@projects/shared/static/src/lib/+state/async-state';
import { Utils } from '@projects/shared/static/src';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Dictionary } from '@ngrx/entity/src/models';
import { Ticker } from '@projects/cryptfolio/portfolio/src/lib/services/coinmarketcap.service';

/**
 * Interface for the 'Portfolio' data used in
 *  - PortfolioState, and
 *  - portfolioReducer
 */
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

export interface Portfolio extends EntityState<Purchase> {
  currency: Currency;
  loading: boolean;
}

export interface PortfolioEntry extends Purchase {
  name: string;
  symbol: string;
  quote: Quote;
  change: number;
  currentValue: number;
}

export interface PortfolioSummary {
  invested: number;
  currentValue: number;
  change: number;
}

const adapter: EntityAdapter<Purchase> = createEntityAdapter<Purchase>();

export const initialState: Portfolio = adapter.getInitialState({ loading: false, currency: Currency.USD });

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions
): Portfolio {
  switch (action.type) {
    case PortfolioActionTypes.PortfolioLoaded: {
      return adapter.addAll(action.purchases, { ...state, loading: false });
    }

    case PortfolioActionTypes.LoadPortfolio: {
      return { ...state, loading: true };
    }

    case PortfolioActionTypes.UpsertEntry: {
      const id = Utils.isDefined(action.purchase.id) ? action.purchase.id : Utils.getNewId(state.ids);
      return adapter.upsertMany([{ id, changes: action.purchase }], state);
    }

    case PortfolioActionTypes.DeleteEntry: {
      return adapter.removeOne(action.id, state)
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

const getPortfolioState = (state: PortfolioState) => state.portfolio;
const getTickersState = (state: PortfolioState) => state.tickers;
const getCurrency = createSelector([getPortfolioState], portfolio => portfolio.currency);
const getLoading = createSelector([getPortfolioState], portfolio => portfolio.loading);
export const getPurchases = createSelector([getPortfolioState], selectEntities);
const getTickers = createSelector([getTickersState], selectTickers);
const getTickersLoading = createSelector([getTickersState], state => state.loading);

export const portfolioEntries = createSelector([getPurchases, getTickers, getCurrency], (purchases, tickers, currency) => {
  return Object.values(purchases).map(purchase => createPortfolioEntry(purchase, tickers, currency)).filter(item => item.name);
});

export const portfolioSummary = createSelector([portfolioEntries], (entries): PortfolioSummary => {
  const invested = entries.map(purchase => purchase.price).reduce((acc, value) => acc + value, 0),
    currentValue = entries.map(purchase => purchase.currentValue).reduce((acc, value) => acc + value, 0),
    change = currentValue && invested ? Math.round(100 * ((currentValue - invested) / invested)) : 0;

  return { invested, change, currentValue };
});

export const loadingPortfolioEntries = createSelector([getLoading, getTickersLoading], (purchaseLoading, tickersLoading) => tickersLoading || purchaseLoading);

function createPortfolioEntry(purchase: Purchase, tickers: Dictionary<Ticker>, currency: Currency): PortfolioEntry {
  const ticker = tickers[purchase.coinId],
    { name, symbol } = { ...ticker },
    quote = ticker && ticker.quotes[currency],
    currentValue = quote && quote.price ? quote.price * purchase.amount : 0,
    change = getChange(purchase.price, quote);

  return { ...purchase, name, symbol, quote, change, currentValue };
}

function getChange(price, quote: Quote): number {
  const currentPrice = quote && quote.price;
  return price && currentPrice ? Math.round(100 * (currentPrice - price) / price) : null;
}
