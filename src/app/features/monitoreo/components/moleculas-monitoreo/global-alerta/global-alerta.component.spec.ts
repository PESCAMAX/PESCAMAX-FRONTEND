import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAlertaComponent } from './global-alerta.component';

describe('GlobalAlertaComponent', () => {
  let component: GlobalAlertaComponent;
  let fixture: ComponentFixture<GlobalAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalAlertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
