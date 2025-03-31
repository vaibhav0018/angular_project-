import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Add RouterModule
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ RouterModule must be imported
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  login() {
    console.log('Sending login request...');
    this.http.post<{ success: boolean }>('http://localhost:5000/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        console.log('Login response:', res);
        if (res.success) {
          console.log('Login successful. Navigating to /dashboard...');
          this.router.navigate(['/dashboard']).then(() => {
            this.cdr.detectChanges(); // ✅ Force view refresh after navigation
          });
        } else {
          this.error = 'Invalid credentials';
        }
      },
      error: () => {
        this.error = 'Login failed.';
      }
    });
  }
}
