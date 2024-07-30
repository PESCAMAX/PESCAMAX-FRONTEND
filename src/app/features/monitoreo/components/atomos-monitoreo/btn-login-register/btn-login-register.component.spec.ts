import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLoginRegisterComponent } from './btn-login-register.component';

describe('BtnLoginRegisterComponent', () => {
  let component: BtnLoginRegisterComponent;
  let fixture: ComponentFixture<BtnLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnLoginRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
