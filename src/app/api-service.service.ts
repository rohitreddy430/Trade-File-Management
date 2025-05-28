import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrlUser = 'http://localhost:8080/user';
  private baseUrlFile = 'http://localhost:8080/file';
  private baseUrl = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseUrlUser}/Login`,
      { username, password },
      { observe: 'response' }
    );
  }

  register(username: string, password: string, role: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseUrlUser}/Register`,
      { username, password, role },
      { observe: 'response' }
    );
  }

  // Upload CSV file and get processed data
  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(
      `${this.baseUrlFile}/importfile`,
      formData
    );
  }

  getUserName() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.get<any>(
      `http://localhost:8080/user/details/${localStorage.getItem("username")}`,
      { headers }
    );
  }
  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists?username=${username}`);
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    });
    return this.http.delete(
      `http://localhost:8080/user/delete/${id}`,
      { headers }
    );
  }
}
