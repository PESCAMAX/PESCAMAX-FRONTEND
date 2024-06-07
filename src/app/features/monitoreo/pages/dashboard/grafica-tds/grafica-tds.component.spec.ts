import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTdsComponent } from './grafica-tds.component';

describe('GraficaTdsComponent', () => {
  let component: GraficaTdsComponent;
  let fixture: ComponentFixture<GraficaTdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficaTdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficaTdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
