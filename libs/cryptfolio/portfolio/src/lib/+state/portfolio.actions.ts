import { PortfolioData } from './portfolio.reducer';
import { Action } from '@ngrx/store';

export enum PortfolioActionTypes {
  LoadPortfolio = '[Portfolio] Load Data',
  PortfolioLoaded = '[Portfolio] Data Loaded'
}

export class LoadPortfolio implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolio;
  constructor() { }
}

export class PortfolioLoaded implements Action {
  readonly type = PortfolioActionTypes.PortfolioLoaded;
  constructor(public payload: PortfolioData = {}) { }
}

export type PortfolioActions = LoadPortfolio | PortfolioLoaded;
