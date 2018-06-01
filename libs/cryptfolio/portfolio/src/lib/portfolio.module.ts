import { CoinsService } from './../../../coins/src/lib/+state/coins.effects';
import { TickersModule } from './../../../tickers/src/lib/tickers.module';
import { CoinsModule } from './../../../coins/src/lib/coins.module';
import { CoinmarketcapService } from '@projects/cryptfolio/portfolio/src/lib/services/coinmarketcap.service';
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
    TickersModule
  ],
  providers: [PortfolioEffects, { provide: CoinsService, useClass: CoinmarketcapService }, { provide: TickersService, useClass: CoinmarketcapService }],
  declarations: [PortfolioComponent]
})
export class PortfolioModule { }
