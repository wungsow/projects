import { async, TestBed } from '@angular/core/testing';
import { FileManagerModule } from './file-manager.module';

describe('FileManagerModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FileManagerModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(FileManagerModule).toBeDefined();
  });
});
