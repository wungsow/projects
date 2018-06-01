import { async, TestBed } from '@angular/core/testing';
import { TickersModule } from './tickers.module';

describe('TickersModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TickersModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(TickersModule).toBeDefined();
  });
});
