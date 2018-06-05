import { async, TestBed } from '@angular/core/testing';
import { SharedStaticModule } from './shared-static.module';

describe('SharedStaticModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SharedStaticModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SharedStaticModule).toBeDefined();
  });
});
