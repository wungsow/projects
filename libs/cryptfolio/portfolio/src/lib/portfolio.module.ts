import { CoinmarketcapService } from './services/coinmarketcap.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { portfolioReducer, initialState as portfolioInitialState } from './+state/portfolio.reducer';
import { PortfolioEffects } from './+state/portfolio.effects';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { TickersService } from '@projects/cryptfolio/tickers/src/lib/+state/tickers.effects';
import { LocalStorageModule } from '@projects/shared/local-storage/src';
import { CoinsModule } from '@projects/cryptfolio/coins/src';
import { TickersModule } from '@projects/cryptfolio/tickers/src';
import { CoinsService } from '@projects/cryptfolio/coins/src/lib/+state/coins.effects';
import { EntriesComponent } from './components/entries/entries.component';
import { EntryComponent } from './components/entry/entry.component';
import { ClarityModule } from '@clr/angular';
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', component: PortfolioComponent }
    ]),

    StoreModule.forFeature('portfolio', portfolioReducer, { initialState: portfolioInitialState }),

    EffectsModule.forFeature([PortfolioEffects]),

    HttpClientModule,
    CoinsModule,
    TickersModule,
    ClarityModule
  ],
  providers: [PortfolioEffects,
    CoinmarketcapService,
    { provide: CoinsService, useExisting: CoinmarketcapService },
    { provide: TickersService, useExisting: CoinmarketcapService }],
  declarations: [PortfolioComponent, EntriesComponent, EntryComponent]
})
export class PortfolioModule { }
