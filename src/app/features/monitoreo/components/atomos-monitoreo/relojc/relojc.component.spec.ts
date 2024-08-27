import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojcComponent } from './relojc.component';

describe('RelojcComponent', () => {
  let component: RelojcComponent;
  let fixture: ComponentFixture<RelojcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelojcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
