import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login' ,
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)]
    })
  });
  
  get NameIsInvalid() {
    return (
      this.form.controls.username.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.invalid
    )
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    )
  }

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(this.form);
    
    if (this.form.valid) {
      const userData = this.form.value;
      console.log(userData);
      this.authService.login(userData).subscribe(response=>{
        console.log(response);
      })
    }

  }
}
