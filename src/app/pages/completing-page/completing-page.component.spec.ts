import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletingPageComponent } from './completing-page.component';

describe('CompletingPageComponent', () => {
  let component: CompletingPageComponent;
  let fixture: ComponentFixture<CompletingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
