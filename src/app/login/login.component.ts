import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string | null = '';
  userCheck: boolean = false;
  passCheck: boolean = false;

  constructor(
    private apiService: ApiService, 
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  usernameCheck() {
    this.userCheck = this.username.trim() === '';
  }

  passwordCheck() {
    this.passCheck = this.password.trim() === '';
  }

  login() {
    this.usernameCheck();
    this.passwordCheck();

    if (this.userCheck || this.passCheck) {
      this.showMessage('Username and Password are required.', 'error');
      return;  // Stop here if validation fails
    }

    this.apiService.login(this.username, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200 && response.body) {
          localStorage.setItem('username', this.username);
          const { jwt } = response.body;
          localStorage.setItem('jwt', jwt);

          this.apiService.getUserName().subscribe({
            next: (userInfo) => {
              this.role = userInfo.role;
              localStorage.setItem('role', this.role || '');

              console.log("Fetched role from backend:", this.role);
              this.route.navigate([this.role === 'ROLE_admin' ? '/registered-users' : '/upload']);
              
              console.log("Defined Routes:", this.route.config);
            },
            error: (error) => {
              console.error('Error fetching user info:', error);
              this.showMessage('Could not fetch user info. Please try again.', 'error');
            }
          });
        }
      },
      error: (error) => {
        console.error('Login Error:', error.status);
      
        this.showMessage(
          'Invalid username or password. Please try again.',
          'error'
        );
      }
      
    });
  }
}
