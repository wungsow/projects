import { async, TestBed } from '@angular/core/testing';
import { PortfolioModule } from './portfolio.module';

describe('PortfolioModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [PortfolioModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PortfolioModule).toBeDefined();
  });
});
