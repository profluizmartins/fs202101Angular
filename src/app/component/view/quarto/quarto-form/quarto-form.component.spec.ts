import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoFormComponent } from './quarto-form.component';

describe('QuartoFormComponent', () => {
  let component: QuartoFormComponent;
  let fixture: ComponentFixture<QuartoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
