import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  CoinsActions,
  CoinsActionTypes,
  LoadCoins,
  CoinsLoaded
} from './coins.actions';
import { CoinsState } from './coins.reducer';
import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class CoinsEffects {
  @Effect() effect$ = this.actions$.ofType(CoinsActionTypes.CoinsAction);

  @Effect()
  loadCoins$ = this.dataPersistence.fetch(CoinsActionTypes.LoadCoins, {
    run: (action: LoadCoins, state: CoinsState) => {
      return new CoinsLoaded(state);
    },

    onError: (action: LoadCoins, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<CoinsState>
  ) {}
}
