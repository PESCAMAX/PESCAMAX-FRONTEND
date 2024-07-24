import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPhComponent } from './graph-ph.component';

describe('GraphPhComponent', () => {
  let component: GraphPhComponent;
  let fixture: ComponentFixture<GraphPhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphPhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});