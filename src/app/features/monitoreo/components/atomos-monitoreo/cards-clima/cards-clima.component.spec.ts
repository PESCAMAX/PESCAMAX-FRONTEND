import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsClimaComponent } from './cards-clima.component';

describe('CardsClimaComponent', () => {
  let component: CardsClimaComponent;
  let fixture: ComponentFixture<CardsClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsClimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
