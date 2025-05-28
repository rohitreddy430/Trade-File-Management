import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Adjust path if needed

@Component({
  selector: 'app-registered-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatSnackBarModule, MatDialogModule, ConfirmDialogComponent],
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private route: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('jwt')) {
      this.route.navigate(['/login']);
      return;
    }
    this.checkUserRole();
  }

  checkUserRole(): void {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('jwt')}` });
    const username = localStorage.getItem('username');

    this.http.get<any>(`http://localhost:8080/user/details/${username}`, { headers }).subscribe({
      next: (data) => {
        this.isAdmin = data.role?.toLowerCase().includes('admin');
        if (this.isAdmin) {
          this.loadUsers(headers);
        } else {
          this.route.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
        this.showMessage('Failed to load user info.', 'error');
        this.route.navigate(['/dashboard']);
      }
    });
  }

  loadUsers(headers: HttpHeaders): void {
    this.http.get<any[]>(`http://localhost:8080/user/all`, { headers }).subscribe({
      next: (allUsers) => {
        this.users = allUsers.filter(user => !user.role?.toLowerCase().includes('admin'));
      },
      error: (error) => {
        console.error('Error fetching all users:', error);
        this.showMessage('Failed to load users.', 'error');
      }
    });
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('jwt')}` });

        this.http.delete(`http://localhost:8080/user/delete/${id}`, { headers }).subscribe({
          next: () => {
            this.showMessage('User deleted successfully.', 'success');
            this.users = this.users.filter(user => user.id !== id);
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.showMessage('Failed to delete user.', 'error');
          }
        });
      }
    });
  }
}
