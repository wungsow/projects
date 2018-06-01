import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  TickersActions,
  TickersActionTypes,
  LoadTickers,
  TickersLoaded
} from './tickers.actions';
import { TickersState } from './tickers.reducer';
import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class TickersEffects {
  @Effect() effect$ = this.actions$.ofType(TickersActionTypes.TickersAction);

  @Effect()
  loadTickers$ = this.dataPersistence.fetch(TickersActionTypes.LoadTickers, {
    run: (action: LoadTickers, state: TickersState) => {
      return new TickersLoaded(state);
    },

    onError: (action: LoadTickers, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TickersState>
  ) {}
}
