import { Purchase } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';
import { PortfolioData } from './portfolio.reducer';
import { Action } from '@ngrx/store';

export enum PortfolioActionTypes {
  LoadPortfolio = '[Portfolio] Load Data',
  PortfolioLoaded = '[Portfolio] Data Loaded',
  UpsertEntry = '[Portfolio] Upsert Entry'
}

export class LoadPortfolio implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolio;
  constructor() { }
}

export class PortfolioLoaded implements Action {
  readonly type = PortfolioActionTypes.PortfolioLoaded;
  constructor(public payload: PortfolioData = {}) { }
}

export class UpsertEntry implements Action {
  readonly type = PortfolioActionTypes.UpsertEntry;
  constructor(public payload: Purchase) { }
}


export type PortfolioActions = LoadPortfolio | PortfolioLoaded | UpsertEntry;
