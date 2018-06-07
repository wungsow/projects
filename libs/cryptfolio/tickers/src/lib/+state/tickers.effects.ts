import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import {
  TickersActionTypes,
  LoadTickers,
  TickersLoaded
} from './tickers.actions';
import { TickersState, Ticker } from './tickers.reducer';
import { DataPersistence } from '@nrwl/nx';
import { range } from 'rxjs';

export abstract class TickersService {
  abstract getTickers(page: number): Observable<{ [id: string]: Ticker }>
}

@Injectable()
export class TickersEffects {

  @Effect()
  loadTickers$ = this.dataPersistence.fetch(TickersActionTypes.LoadTickers, {
    run: ({ ids }: LoadTickers, state: TickersState) => {
      // Lazy load, only loa ones we don't already have
      const alreadyLoaded = Object.keys(state.tickers.entities),
        toLoad = ids.filter(id => !alreadyLoaded.includes(id));

      return fromPromise(this.getTickers(toLoad)).pipe(map(tickers => new TickersLoaded(Object.values(tickers))));
    },

    onError: (action: LoadTickers, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private dataPersistence: DataPersistence<TickersState>,
    private tickersService: TickersService
  ) { }

  async getTickers(ids: string[]): Promise<{ [id: string]: Ticker }> {
    let page = 1,
      tickers = {};

    while (ids.length) {
      const tickersForPage = await this.tickersService.getTickers(page++).toPromise(),
        idsReturned = Object.keys(tickersForPage);
      ids = ids.filter(id => !idsReturned.includes(id));
      tickers = { ...tickers, ...tickersForPage };
    }

    return tickers;
  }
}
