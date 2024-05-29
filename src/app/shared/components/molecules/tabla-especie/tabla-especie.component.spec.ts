import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEspecieComponent } from './tabla-especie.component';

describe('TablaEspecieComponent', () => {
  let component: TablaEspecieComponent;
  let fixture: ComponentFixture<TablaEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaEspecieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
