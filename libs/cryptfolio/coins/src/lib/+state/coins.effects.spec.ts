import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { CoinsEffects } from './coins.effects';
import { LoadCoins, CoinsLoaded } from './coins.actions';

import { Observable } from 'rxjs';

describe('CoinsEffects', () => {
  let actions$: Observable<any>;
  let effects$: CoinsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        CoinsEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(CoinsEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadCoins({}) });
      expect(effects$.loadCoins$).toBeObservable(
        hot('-a-|', { a: new CoinsLoaded({}) })
      );
    });
  });
});
