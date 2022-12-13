import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormComponentComponent } from './file-form-component.component';

describe('FileFormComponentComponent', () => {
  let component: FileFormComponentComponent;
  let fixture: ComponentFixture<FileFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
