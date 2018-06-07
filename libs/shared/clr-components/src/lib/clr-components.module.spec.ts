import { async, TestBed } from '@angular/core/testing';
import { ClrComponentsModule } from './clr-components.module';

describe('ClrComponentsModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ClrComponentsModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ClrComponentsModule).toBeDefined();
  });
});
