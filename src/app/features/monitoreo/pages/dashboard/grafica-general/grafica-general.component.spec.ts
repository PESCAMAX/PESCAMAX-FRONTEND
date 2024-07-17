import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaGeneralComponent } from './grafica-general.component';

describe('GraficaGeneralComponent', () => {
  let component: GraficaGeneralComponent;
  let fixture: ComponentFixture<GraficaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficaGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
