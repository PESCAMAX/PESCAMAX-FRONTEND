import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficastdssComponent } from './graficastdss.component';

describe('GraficastdssComponent', () => {
  let component: GraficastdssComponent;
  let fixture: ComponentFixture<GraficastdssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficastdssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficastdssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
