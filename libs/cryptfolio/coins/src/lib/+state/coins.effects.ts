import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import {
  CoinsActionTypes,
  LoadCoins,
  CoinsLoaded
} from './coins.actions';
import { CoinsState, Coin } from './coins.reducer';
import { DataPersistence } from '@nrwl/nx';

export abstract class CoinsService {
  abstract getCoins(): Observable<Coin[]>;
}

@Injectable()
export class CoinsEffects {
  @Effect()
  loadCoins$ = this.dataPersistence.fetch(CoinsActionTypes.LoadCoins, {
    run: (action: LoadCoins, state: CoinsState) => this.coinService.getCoins().pipe(map(coins => new CoinsLoaded(coins))),

    onError: (action: LoadCoins, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private dataPersistence: DataPersistence<CoinsState>,
    private coinService: CoinsService
  ) { }
}
