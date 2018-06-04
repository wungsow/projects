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
import { PortfolioState, PortfolioData } from './portfolio.reducer';
import { DataPersistence } from '@nrwl/nx';
import { LoadCoins } from '@projects/cryptfolio/coins/src/lib/+state/coins.actions';
import { LocalStorageService } from '@projects/shared/local-storage/src/lib/local-storage.service';

@Injectable()
export class PortfolioEffects {
  private readonly storageKey = 'portfolio';

  @Effect()
  loadPortfolio$ = this.dataPersistence.fetch(
    PortfolioActionTypes.LoadPortfolio,
    {
      run: (action: LoadPortfolio, state: PortfolioState) => {
        // TODO Remove-----------------------------------------------------------------------------
        this.localStrorageService.setItem(this.storageKey, {
          1: {
            amount: 2,
            coinId: 1,
            id: 1,
            price: 4000
          },
          2: {
            amount: 2,
            coinId: 2757,
            id: 1,
            price: 4000
          }
        });
        // ---------------------------------------------------------------------------------------
        const storedPortfolio = this.localStrorageService.getItem<PortfolioData>(this.storageKey);
        // TODO get from local storage
        return new PortfolioLoaded(storedPortfolio);
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
  loadTickers$ = this.dataPersistence.fetch(PortfolioActionTypes.PortfolioLoaded, {
    run: (({ payload }: PortfolioLoaded) => new LoadTickers(Object.values(payload).map(item => item.coinId.toString())))
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PortfolioState>,
    private localStrorageService: LocalStorageService
  ) { }
}
