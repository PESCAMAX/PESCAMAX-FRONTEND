import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsFormComponent } from './inputs-form.component';

describe('InputsFormComponent', () => {
  let component: InputsFormComponent;
  let fixture: ComponentFixture<InputsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
