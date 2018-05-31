import { Action } from '@ngrx/store';

export enum PortfolioActionTypes {
  PortfolioAction = '[Portfolio] Action',
  LoadPortfolio = '[Portfolio] Load Data',
  PortfolioLoaded = '[Portfolio] Data Loaded'
}

export class Portfolio implements Action {
  readonly type = PortfolioActionTypes.PortfolioAction;
}
export class LoadPortfolio implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolio;
  constructor(public payload: any) {}
}

export class PortfolioLoaded implements Action {
  readonly type = PortfolioActionTypes.PortfolioLoaded;
  constructor(public payload: any) {}
}

export type PortfolioActions = Portfolio | LoadPortfolio | PortfolioLoaded;
