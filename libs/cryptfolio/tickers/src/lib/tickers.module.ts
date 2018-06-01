import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tickersReducer, initialState as tickersInitialState } from './+state/tickers.reducer';
import { TickersEffects } from './+state/tickers.effects';
@NgModule({
  imports: [CommonModule, StoreModule.forFeature('tickers', tickersReducer, { initialState: tickersInitialState }), EffectsModule.forFeature([TickersEffects])],
  providers: [TickersEffects]
})
export class TickersModule { }
