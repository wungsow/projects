import { EntityState } from '@ngrx/entity';
import { Purchase } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';
import { Action } from '@ngrx/store';

export enum PortfolioActionTypes {
  LoadPortfolio = '[Portfolio] Load Data',
  PortfolioLoaded = '[Portfolio] Data Loaded',
  UpsertEntry = '[Portfolio] Upsert Entry',
  DeleteEntry = '[Portfolio] Delete Entry'
}

export class LoadPortfolio implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolio;
  constructor() { }
}

export class PortfolioLoaded implements Action {
  readonly type = PortfolioActionTypes.PortfolioLoaded;
  constructor(public purchases: Purchase[]) { }
}

export class UpsertEntry implements Action {
  readonly type = PortfolioActionTypes.UpsertEntry;
  constructor(public purchase: Partial<Purchase>) { }
}

export class DeleteEntry implements Action {
  readonly type = PortfolioActionTypes.DeleteEntry;
  constructor(public id: number) { }
}

export type PortfolioActions = LoadPortfolio | PortfolioLoaded | UpsertEntry | DeleteEntry;
