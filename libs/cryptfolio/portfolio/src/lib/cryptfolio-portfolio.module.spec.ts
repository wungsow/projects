import { async, TestBed } from '@angular/core/testing';
import { CryptfolioPortfolioModule } from './cryptfolio-portfolio.module';

describe('CryptfolioPortfolioModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CryptfolioPortfolioModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CryptfolioPortfolioModule).toBeDefined();
  });
});
