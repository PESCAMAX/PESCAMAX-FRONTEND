import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPhComponent } from './grafica-ph.component';

describe('GraficaPhComponent', () => {
  let component: GraficaPhComponent;
  let fixture: ComponentFixture<GraficaPhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficaPhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficaPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
