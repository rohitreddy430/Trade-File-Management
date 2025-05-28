import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  adminPasscode: string = '';
  correctPasscode: string = 'BIGBULL';
  usernameExists: boolean = false;
  checkingUsername: boolean = false;

  constructor(
    private apiService: ApiService, 
    private router: Router,
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

  checkUsername() {
    if (!this.username.trim()) return; // Prevent unnecessary calls

    this.checkingUsername = true;
    this.apiService.checkUsernameExists(this.username).subscribe({
      next: (exists: boolean) => {
        this.usernameExists = exists;
        this.checkingUsername = false;
      },
      error: () => {
        this.usernameExists = false;
        this.checkingUsername = false;
      }
    });
  }

  register() {
    if (!this.username.trim()) {
      this.showMessage('Username is required.', 'error');
      return;
    }

    if (!this.password.trim()) {
      this.showMessage('Password is required.', 'error');
      return;
    }

    if (this.usernameExists) {
      this.showMessage('Username already exists. Please choose another.', 'error');
      return;
    }

    if (this.role === 'admin' && this.adminPasscode !== this.correctPasscode) {
      this.showMessage('Incorrect admin passcode. Registration blocked.', 'error');
      return;
    }

    this.apiService.register(this.username, this.password, this.role).subscribe({
      next: (response: any) => {
        const successMessage = response.message ?? 'Registration successful!';
        this.showMessage(successMessage, 'success');
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', this.role || 'guest');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Registration Error:', error);
        if (error.status === 409 || error.status === 400) {
          this.showMessage(error.error?.error ?? 'Registration error.', 'error');
        } else {
          this.showMessage('Registration failed. Please try again later.', 'error');
        }
      }
    });
  }
}
