import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFileForTemplateComponent } from './choose-file-for-template.component';

describe('ChooseFileForTemplateComponent', () => {
  let component: ChooseFileForTemplateComponent;
  let fixture: ComponentFixture<ChooseFileForTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFileForTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFileForTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
