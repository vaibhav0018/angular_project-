import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  template: `
  <div style="display: flex; justify-content: center; align-items: center; height: 90vh;">
    <mat-card class="mat-elevation-z6" style="width: 400px; max-width: 90%;">
      <div style="text-align: center; background: #3f51b5; padding: 1rem;">
        <img [src]="companyLogo" width="60%" style="background-color:white;">
      </div>

      <mat-card-content style="padding: 2rem;">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <h3 style="text-align: center; margin-bottom: 1.5rem;">Member - Login</h3>

          <mat-form-field appearance="outline" class="w-100">
            <input matInput placeholder="User Id / Email Id" formControlName="username" />
            <mat-error *ngIf="form.controls['username'].errors?.['required']">
              User Id/Email Id is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-100">
            <input matInput [type]="txtType" placeholder="Password" formControlName="password" />
            <button mat-icon-button matSuffix type="button" (click)="viewPassword()" tabindex="-1">
              <mat-icon>remove_red_eye</mat-icon>
            </button>
            <mat-error *ngIf="form.controls['password'].errors?.['required']">
              Password is required
            </mat-error>
          </mat-form-field>

          <div style="text-align: center; margin-top: 1rem;">
            <button mat-raised-button color="primary" type="submit">SIGN IN</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div>
`,

  styles: [`
    .w-100 {
      width: 100%;
    }
  `]
})

export class LoginComponent {
  form: FormGroup;
  txtType: string = 'password';
  companyLogo = './assets/img/users/logo.png';
  

  constructor(private fb: FormBuilder, public router: Router,private loginService: LoginService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  viewPassword(): void {
    this.txtType = this.txtType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    let payload = {
      usr_userid: this.form.value.username.trim(),
      usr_password: this.form.value.password
    };

    console.log('Login payload:', payload);
    // Call Java backend API here later

    //g
    this.loginService.userLogin(payload).subscribe({
      next: (res) => {
        console.log('Login success', res);
        // Optionally store token or user info in session/local storage
        if (res.responseStatus === 'SUCCESS' && res.responseCode === 'RES_200') {
          sessionStorage.setItem('userId', btoa(res.usr_userid));
          sessionStorage.setItem('username', btoa(res.usr_name));
          
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
        }
        else {
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid username or password');
      }
       // this.router.navigate(['/dashboard']);
  
    })
  }
}
