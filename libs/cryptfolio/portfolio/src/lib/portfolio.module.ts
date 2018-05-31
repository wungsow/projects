import { Portfolio } from './+state/portfolio.actions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { portfolioReducer, initialState as portfolioInitialState } from './+state/portfolio.reducer';
import { PortfolioEffects } from './+state/portfolio.effects';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', component: PortfolioComponent }
    ]),

    StoreModule.forFeature('portfolio', portfolioReducer, { initialState: portfolioInitialState }),

    EffectsModule.forFeature([PortfolioEffects])
  ],
  providers: [PortfolioEffects],
  declarations: [PortfolioComponent]
})
export class PortfolioModule { }
