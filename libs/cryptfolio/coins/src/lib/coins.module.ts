import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  coinsReducer,
  initialState as coinsInitialState
} from './+state/coins.reducer';
import { CoinsEffects } from './+state/coins.effects';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('coins', coinsReducer, {
      initialState: coinsInitialState
    }),
    EffectsModule.forFeature([CoinsEffects])
  ],
  providers: [CoinsEffects]
})
export class CoinsModule {}
