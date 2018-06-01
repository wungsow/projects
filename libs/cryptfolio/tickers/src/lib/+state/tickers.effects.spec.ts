import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TickersEffects } from './tickers.effects';
import { LoadTickers, TickersLoaded } from './tickers.actions';

import { Observable } from 'rxjs';

describe('TickersEffects', () => {
  let actions$: Observable<any>;
  let effects$: TickersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        TickersEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(TickersEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadTickers({}) });
      expect(effects$.loadTickers$).toBeObservable(
        hot('-a-|', { a: new TickersLoaded({}) })
      );
    });
  });
});
