import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';
import { RouterLink } from '@angular/router';

// Factory Function
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)]
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)]
        })
      },
      {
        validators: [equalValues('password', 'confirmPassword')]
      }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.required] })
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value;
      console.log(userData);
      console.log(userData.agree);
      this.authService.registerUser(userData).subscribe(response=>{
        console.log(response);
      })
    } else {
      return;
    }
  }

  onReset() {
    this.form.reset();
  }
}
