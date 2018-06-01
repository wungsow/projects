import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  TickersActions,
  TickersActionTypes,
  LoadTickers,
  TickersLoaded
} from './tickers.actions';
import { TickersState, Ticker } from './tickers.reducer';
import { DataPersistence } from '@nrwl/nx';

export abstract class TickersService {
  abstract getTickers(page: number): Observable<{ [id: string]: Ticker }>
}

@Injectable()
export class TickersEffects {

  @Effect()
  loadTickers$ = this.dataPersistence.fetch(TickersActionTypes.LoadTickers, {
    run: (action: LoadTickers, state: TickersState) => this.tickersService.getTickers(1).pipe(map(tickers => new TickersLoaded(tickers))),

    onError: (action: LoadTickers, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TickersState>,
    private tickersService: TickersService
  ) { }
}
