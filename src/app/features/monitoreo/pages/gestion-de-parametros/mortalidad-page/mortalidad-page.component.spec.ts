import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalidadPageComponent } from './mortalidad-page.component';

describe('MortalidadPageComponent', () => {
  let component: MortalidadPageComponent;
  let fixture: ComponentFixture<MortalidadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortalidadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MortalidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
