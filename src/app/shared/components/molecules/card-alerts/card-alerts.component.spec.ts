import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlertsComponent } from './card-alerts.component';

describe('CardAlertsComponent', () => {
  let component: CardAlertsComponent;
  let fixture: ComponentFixture<CardAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAlertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
