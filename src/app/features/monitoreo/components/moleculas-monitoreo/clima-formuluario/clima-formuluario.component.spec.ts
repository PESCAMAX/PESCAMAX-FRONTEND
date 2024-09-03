import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaFormuluarioComponent } from './clima-formuluario.component';

describe('ClimaFormuluarioComponent', () => {
  let component: ClimaFormuluarioComponent;
  let fixture: ComponentFixture<ClimaFormuluarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClimaFormuluarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClimaFormuluarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
