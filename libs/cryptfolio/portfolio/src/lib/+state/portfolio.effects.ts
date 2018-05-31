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

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PortfolioState>
  ) {}
}
