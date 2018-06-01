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
  loadPortfolio$ = this.dataPersistence.fetch(
    PortfolioActionTypes.LoadPortfolio,
    {
      run: (action: LoadPortfolio, state: PortfolioState) => {
        // TODO get from local storage
        return new PortfolioLoaded({
          1: {
            amount: 2,
            coinId: 1,
            id: 1,
            price: 4000
          }
        });
      },

      onError: (action: LoadPortfolio, error) => {
        console.error('Error', error);
      }
    }
  );



  @Effect()
  initialiseCoins$ = this.dataPersistence.navigation(PortfolioComponent, { run: () => new LoadCoins() });

  @Effect()
  initialisePortfolio$ = this.dataPersistence.navigation(PortfolioComponent, { run: () => new LoadPortfolio() });

  @Effect()
  loadTickers$ = this.dataPersistence.fetch(PortfolioActionTypes.PortfolioLoaded, { run: () => new LoadTickers() });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PortfolioState>
  ) { }
}
