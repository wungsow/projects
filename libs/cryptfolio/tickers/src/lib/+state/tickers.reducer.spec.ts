import { TickersLoaded } from './tickers.actions';
import { tickersReducer, initialState } from './tickers.reducer';

describe('tickersReducer', () => {
  it('should work', () => {
    const action: TickersLoaded = new TickersLoaded({});
    const actual = tickersReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
