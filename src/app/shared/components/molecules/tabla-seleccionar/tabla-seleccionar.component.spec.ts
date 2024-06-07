import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSeleccionarComponent } from './tabla-seleccionar.component';

describe('TablaSeleccionarComponent', () => {
  let component: TablaSeleccionarComponent;
  let fixture: ComponentFixture<TablaSeleccionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaSeleccionarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaSeleccionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
