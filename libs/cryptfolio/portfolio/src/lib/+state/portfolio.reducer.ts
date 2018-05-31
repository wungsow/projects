import { Action } from '@ngrx/store';
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions';

/**
 * Interface for the 'Portfolio' data used in
 *  - PortfolioState, and
 *  - portfolioReducer
 */
export interface PortfolioData {}

/**
 * Interface to the part of the Store containing PortfolioState
 * and other information related to PortfolioData.
 */
export interface PortfolioState {
  readonly portfolio: PortfolioData;
}

export const initialState: PortfolioData = {};

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
