import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDismissComponent } from './button-dismiss.component';

describe('ButtonDismissComponent', () => {
  let component: ButtonDismissComponent;
  let fixture: ComponentFixture<ButtonDismissComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonDismissComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDismissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
