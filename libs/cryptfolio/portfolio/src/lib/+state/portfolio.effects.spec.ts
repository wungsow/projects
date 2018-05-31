import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { PortfolioEffects } from './portfolio.effects';
import { LoadPortfolio, PortfolioLoaded } from './portfolio.actions';

import { Observable } from 'rxjs';

describe('PortfolioEffects', () => {
  let actions$: Observable<any>;
  let effects$: PortfolioEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        PortfolioEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(PortfolioEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadPortfolio({}) });
      expect(effects$.loadPortfolio$).toBeObservable(
        hot('-a-|', { a: new PortfolioLoaded({}) })
      );
    });
  });
});
