import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.css']
})
export class ConfigUserComponent {
  updateUserForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.updateUserForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newEmail: [''],
      newUserName: [''],
      newPassword: ['']
    });
  }

  onSubmit() {
    const updateUser = this.updateUserForm.value;
    this.http.post('/api/User/update', updateUser)
      .subscribe(response => {
        console.log('User updated successfully:', response);
      }, error => {
        console.error('Error updating user:', error);
      });
  }
}
