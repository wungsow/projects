import { Action } from '@ngrx/store';
import { PortfolioComponent } from './../containers/portfolio/portfolio.component';
import { Injectable, Type } from '@angular/core';
import { Effect } from '@ngrx/effects';
import {
  PortfolioActionTypes,
  LoadPortfolio,
  PortfolioLoaded,
  UpsertEntry
} from './portfolio.actions';
import { PortfolioState, Purchase } from './portfolio.reducer';
import { DataPersistence } from '@nrwl/nx';
import { LoadCoins } from '@projects/cryptfolio/coins/src/lib/+state/coins.actions';
import { LocalStorageService } from '@projects/shared/local-storage/src';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoadTickers } from '@projects/cryptfolio/tickers/src';
import { Dictionary } from '@ngrx/entity/src/models';

@Injectable()
export class PortfolioEffects {
  private readonly storageKey = 'portfolio';

  @Effect()
  loadPortfolio$ = this.dataPersistence.fetch(
    PortfolioActionTypes.LoadPortfolio,
    {
      run: (action: LoadPortfolio, state: PortfolioState) => {
        const storedPortfolio = this.localStrorageService.getItem<Dictionary<Purchase>>(this.storageKey);
        return new PortfolioLoaded(Object.values(storedPortfolio));
      },

      onError: (action: LoadPortfolio, error) => {
        console.error('Error', error);
      }
    }
  );


  @Effect()
  initialiseCoins$ = this.onNav(PortfolioComponent, new LoadCoins());

  @Effect()
  initialisePortfolio$ = this.dataPersistence.navigation(PortfolioComponent, { run: () => new LoadPortfolio() });

  @Effect()
  loadTickers$ = this.dataPersistence.fetch(PortfolioActionTypes.PortfolioLoaded, {
    run: (({ purchases }: PortfolioLoaded) => new LoadTickers(Object.values(purchases).map(item => item.coinId.toString())))
  });

  @Effect()
  loadTicker$ = this.dataPersistence.fetch(PortfolioActionTypes.UpsertEntry, {
    run: ({ purchase }: UpsertEntry, state: PortfolioState) => {
      this.localStrorageService.setItem(this.storageKey, state.portfolio.entities);
      return new LoadTickers([purchase.coinId.toString()]);
    }
  });

  @Effect()
  deleteEntry$ = this.dataPersistence.fetch(PortfolioActionTypes.DeleteEntry, {
    run: ({ purchase }: UpsertEntry, state: PortfolioState) => this.localStrorageService.setItem(this.storageKey, state.portfolio.entities)
  })

  constructor(
    private dataPersistence: DataPersistence<PortfolioState>,
    private localStrorageService: LocalStorageService
  ) { }

  onNav(component: Type<any>, action: Action) {
    return this.dataPersistence.navigation(component, {
      run: () => action,
      onError: (route, error) => this.handleError(error)
    });
  }

  handleError(error) {
    // TODO
  }
}
