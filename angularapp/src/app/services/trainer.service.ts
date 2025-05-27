import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trainer } from '../models/trainer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  public apiUrl = 'http://<url>:8080';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    console.warn('Authentication token not found in localStorage.');
    return new HttpHeaders();
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllTrainer(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}/api/trainer`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getTrainerById(trainerId: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/api/trainer/${trainerId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  addTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/api/trainer`, trainer, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateTrainer(trainerId: number, trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/api/trainer/${trainerId}`, trainer, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrainer(trainerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/trainer/${trainerId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  fetchResumeDocument(resumeIdentifier: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/trainer/resume/${resumeIdentifier}`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  acceptTrainer(trainerId: number, requirementId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/api/requirement/${requirementId}/assign-trainer/${trainerId}`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  rejectTrainer(trainerId: number, requirementId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/api/requirement/${requirementId}/reject-trainer/${trainerId}`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
export { Trainer };

