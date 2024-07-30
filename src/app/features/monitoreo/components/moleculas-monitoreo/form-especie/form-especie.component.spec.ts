import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EspecieFormComponent } from './form-especie.component';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

describe('FormEspecieComponent', () => {
  let component: EspecieFormComponent;
  let fixture: ComponentFixture<EspecieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspecieFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ApiService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
