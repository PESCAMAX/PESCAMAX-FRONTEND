import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaClimaComponent } from './tarjeta-clima.component';

describe('TarjetaClimaComponent', () => {
  let component: TarjetaClimaComponent;
  let fixture: ComponentFixture<TarjetaClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetaClimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
