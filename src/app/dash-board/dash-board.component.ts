import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardDataService } from '../dashboard-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatSnackBarModule],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashboardComponent implements OnInit {
  results: any[] = [];
  filteredResults: any[] = [];
  tableHeaders: string[] = [];
  statusOptions: string[] = ['NEW', 'FAILED', 'PROCESSED'];

  // Individual search inputs
  searchId: string = '';
  searchFileName: string = '';
  searchStatus: string = '';
  searchFromDate: string = '';
  searchToDate: string = '';
  

  constructor(
    private http: HttpClient,
    private dashboardDataService: DashboardDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  loadFiles(): void {
    this.http.get<any[]>('http://localhost:8080/api/file-loads/search').subscribe({
      next: (data) => {
        this.results = data || [];
        this.filteredResults = [...this.results];
        this.tableHeaders = this.results.length > 0 ? Object.keys(this.results[0]) : [];
        this.results.forEach(row => {
          row.newStatus = row.status;
        });
      },
      error: (err) => {
        console.error('Error loading files:', err);
        this.showMessage('Failed to load files.', 'error');
      }
    });
  }

  updateFileStatus(row: any): void {
    if (!row.newStatus) return;

    this.http.put(`http://localhost:8080/api/file-loads/${row.id}/status`, { status: row.newStatus }).subscribe({
      next: () => {
        this.showMessage('Status updated.', 'success');
        row.status = row.newStatus;
      },
      error: err => {
        console.error(err);
        this.showMessage('Update failed.', 'error');
      }
    });
  }

  async deleteFile(row: any, index: number): Promise<void> {
    const confirmed = await this.confirmDialog(`Delete file ${row.fileName}?`);
    if (!confirmed) return;

    this.http.delete(`http://localhost:8080/api/file-loads/${row.id}`).subscribe({
      next: () => {
        this.showMessage('File deleted.', 'success');
        this.results.splice(index, 1);
        this.filteredResults = [...this.results];
      },
      error: err => {
        console.error(err);
        this.showMessage('Delete failed.', 'error');
      }
    });
  }

  confirmDialog(message: string): Promise<boolean> {
    return new Promise(resolve => {
      const snackBarRef = this.snackBar.open(message, 'Confirm', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-confirm'
      });

      snackBarRef.onAction().subscribe(() => resolve(true));
      setTimeout(() => resolve(false), 5000);
    });
  }

  onSearch(): void {
    
    this.filteredResults = this.results.filter(row => {
      // Check ID match
      let matchId = true;
      if (this.searchId && this.searchId.trim() !== '') {
        matchId = (row.id === Number(this.searchId));
      }

      // Check filename exact base name match
      let matchFileName = true;
      if (this.searchFileName && this.searchFileName.trim() !== '') {
        if (row.fileName) {
          const rowBaseName = row.fileName.toLowerCase().split('.')[0];
          const inputBaseName = this.searchFileName.toLowerCase().split('.')[0];
          matchFileName = (rowBaseName === inputBaseName);
        } else {
          matchFileName = false;
        }
      }

      // Check status exact match (case insensitive)
      let matchStatus = true;
      if (this.searchStatus && this.searchStatus.trim() !== '') {
        if (row.status) {
          matchStatus = (row.status.toLowerCase() === this.searchStatus.toLowerCase());
        } else {
          matchStatus = false;
        }
      }

      // Check date range
      let matchDateRange = true;
      if (this.searchFromDate && this.searchToDate) {
        const from = new Date(this.searchFromDate);
        const to = new Date(this.searchToDate);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        if (row.localDate) {
          const rowDate = new Date(row.localDate);
          matchDateRange = (rowDate >= from && rowDate <= to);
        } else {
          matchDateRange = false;
        }
      }
      
      return matchId && matchFileName && matchStatus && matchDateRange;
    });
    this.searchId = '';
    this.searchFileName = '';
    this.searchStatus = '';
    this.searchFromDate = '';
    this.searchToDate = '';
  }

  clearSearch(): void {
    this.searchId = '';
    this.searchFileName = '';
    this.searchStatus = '';
    this.searchFromDate = '';
    this.searchToDate = '';
    this.filteredResults = [...this.results];
  }
}
