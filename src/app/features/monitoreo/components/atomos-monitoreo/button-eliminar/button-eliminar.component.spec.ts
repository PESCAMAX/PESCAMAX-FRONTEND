import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEliminarComponent } from './button-eliminar.component';

describe('ButtonEliminarComponent', () => {
  let component: ButtonEliminarComponent;
  let fixture: ComponentFixture<ButtonEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
