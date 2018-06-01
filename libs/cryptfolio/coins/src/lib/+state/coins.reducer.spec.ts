import { CoinsLoaded } from './coins.actions';
import { coinsReducer, initialState } from './coins.reducer';

describe('coinsReducer', () => {
  it('should work', () => {
    const action: CoinsLoaded = new CoinsLoaded({});
    const actual = coinsReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
