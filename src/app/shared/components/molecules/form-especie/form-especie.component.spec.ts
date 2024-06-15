import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormEspecieComponent } from './form-especie.component';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

describe('FormEspecieComponent', () => {
  let component: FormEspecieComponent;
  let fixture: ComponentFixture<FormEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEspecieComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ApiService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
