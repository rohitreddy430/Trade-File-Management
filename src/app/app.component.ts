import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trade-file';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // No manual init needed; use isLoggedIn()
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt'); // Checks if user is logged in
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_admin'; // Checks if user is admin
  }

  onLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    this.snackBar.open('Logged out successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snackbar-success'
    });

    // Use router.navigate with a small delay so snackbar can show briefly
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
