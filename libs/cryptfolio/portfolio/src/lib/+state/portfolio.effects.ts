import { LoadTickers } from './../../../../tickers/src/lib/+state/tickers.actions';
import { PortfolioComponent } from './../containers/portfolio/portfolio.component';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  PortfolioActions,
  PortfolioActionTypes,
  LoadPortfolio,
  PortfolioLoaded
} from './portfolio.actions';
import { PortfolioState } from './portfolio.reducer';
import { DataPersistence } from '@nrwl/nx';
import { LoadCoins } from '@projects/cryptfolio/coins/src/lib/+state/coins.actions';

@Injectable()
export class PortfolioEffects {
  @Effect()
  effect$ = this.actions$.ofType(PortfolioActionTypes.PortfolioAction);

  @Effect()
  loadPortfolio$ = this.dataPersistence.fetch(
    PortfolioActionTypes.LoadPortfolio,
    {
      run: (action: LoadPortfolio, state: PortfolioState) => {
        return new PortfolioLoaded(state);
      },

      onError: (action: LoadPortfolio, error) => {
        console.error('Error', error);
      }
    }
  );

  @Effect()
  initialiseCoins$ = this.dataPersistence.navigation(PortfolioComponent, { run: () => new LoadCoins() });

  @Effect()
  initialiseTickers$ = this.dataPersistence.navigation(PortfolioComponent, { run: () => new LoadTickers() });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PortfolioState>
  ) { }
}
