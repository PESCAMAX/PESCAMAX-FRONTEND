import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPageComponent } from './cambiar-page.component';

describe('CambiarPageComponent', () => {
  let component: CambiarPageComponent;
  let fixture: ComponentFixture<CambiarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
