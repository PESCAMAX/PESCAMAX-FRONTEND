import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaswordComponent } from './view-pasword.component';

describe('ViewPaswordComponent', () => {
  let component: ViewPaswordComponent;
  let fixture: ComponentFixture<ViewPaswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPaswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
