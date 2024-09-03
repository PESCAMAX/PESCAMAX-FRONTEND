import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaClimaComponent } from './pagina-clima.component';

describe('PaginaClimaComponent', () => {
  let component: PaginaClimaComponent;
  let fixture: ComponentFixture<PaginaClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaClimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
