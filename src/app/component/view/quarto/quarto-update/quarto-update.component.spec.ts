import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoUpdateComponent } from './quarto-update.component';

describe('QuartoUpdateComponent', () => {
  let component: QuartoUpdateComponent;
  let fixture: ComponentFixture<QuartoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
