import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSensorComponent } from './datos-sensor.component';

describe('DatosSensorComponent', () => {
  let component: DatosSensorComponent;
  let fixture: ComponentFixture<DatosSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
