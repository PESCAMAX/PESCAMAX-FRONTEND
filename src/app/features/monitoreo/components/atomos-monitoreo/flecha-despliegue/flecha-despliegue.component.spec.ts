import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlechaDespliegueComponent } from './flecha-despliegue.component';

describe('FlechaDespliegueComponent', () => {
  let component: FlechaDespliegueComponent;
  let fixture: ComponentFixture<FlechaDespliegueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlechaDespliegueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlechaDespliegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
