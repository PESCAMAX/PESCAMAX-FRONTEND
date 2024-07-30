import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonViewMoreComponent } from './button-view-more.component';

describe('ButtonViewMoreComponent', () => {
  let component: ButtonViewMoreComponent;
  let fixture: ComponentFixture<ButtonViewMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonViewMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
