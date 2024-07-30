import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSensorComponent } from './tabla-sensor.component';

describe('TablaSensorComponent', () => {
  let component: TablaSensorComponent;
  let fixture: ComponentFixture<TablaSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
