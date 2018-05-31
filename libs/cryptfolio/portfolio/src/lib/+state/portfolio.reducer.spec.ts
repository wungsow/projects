import { PortfolioLoaded } from './portfolio.actions';
import { portfolioReducer, initialState } from './portfolio.reducer';

describe('portfolioReducer', () => {
  it('should work', () => {
    const action: PortfolioLoaded = new PortfolioLoaded({});
    const actual = portfolioReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
