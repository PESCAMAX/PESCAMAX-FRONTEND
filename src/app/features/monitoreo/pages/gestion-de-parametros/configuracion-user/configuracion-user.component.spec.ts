import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionUserComponent } from './configuracion-user.component';

describe('ConfiguracionUserComponent', () => {
  let component: ConfiguracionUserComponent;
  let fixture: ComponentFixture<ConfiguracionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
