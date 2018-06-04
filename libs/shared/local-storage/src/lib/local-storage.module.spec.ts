import { async, TestBed } from '@angular/core/testing';
import { LocalStorageModule } from './local-storage.module';

describe('LocalStorageModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [LocalStorageModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(LocalStorageModule).toBeDefined();
  });
});
