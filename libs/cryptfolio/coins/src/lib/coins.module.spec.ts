import { async, TestBed } from '@angular/core/testing';
import { CoinsModule } from './coins.module';

describe('CoinsModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoinsModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CoinsModule).toBeDefined();
  });
});
