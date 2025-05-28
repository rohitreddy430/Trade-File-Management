import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatSnackBarModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  isUploading = false;
  fileUploaded = false;
  uploadError = false;

  constructor(
    private http: HttpClient,
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file.name.toLowerCase().endsWith('.csv')) {
        this.showMessage('Please select a CSV file.', 'error');
        input.value = '';
        return;
      }
      this.selectedFile = file;
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.isUploading = true;

    this.http.post('http://localhost:8080/file/importfile', formData).subscribe({
      next: () => {
        this.showMessage('File uploaded successfully!', 'success');
        this.selectedFile = null;
        this.isUploading = false;

        this.router.navigate(['/dashboard']).then(() => {
          location.reload(); // Refresh dashboard data after navigation
        });
      },
      error: err => {
        console.error('Upload failed:', err);
        this.showMessage('File upload failed.', 'error');
        this.isUploading = false;
        this.uploadError = true;
      }
    });
  }
}
