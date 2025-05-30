import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; // Import throwError
import { catchError } from 'rxjs/operators'; // Import catchError
import { Requirement } from '../models/requirement.model';
import { Trainer } from '../models/trainer.model'; // Assuming Trainer model is also needed for assigning

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  public apiUrl = 'https://8080-eabeaccbadfdeebeedbbcceabbdaabecfbecfaedd.project.examly.io';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) { // Added check for token existence
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    console.warn('Authentication token not found in localStorage.'); // Added warning
    return new HttpHeaders(); // Return empty headers if no token
  }

  // Centralized error handling method
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

  // 1. Get all requirements
  getAllRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/api/requirement`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // 2. Get requirement by Id
  getRequirementById(requirementId: number): Observable<Requirement> {
    return this.http.get<Requirement>(`${this.apiUrl}/api/requirement/${requirementId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // 3. Add a new requirement
  addRequirement(requirement: Requirement): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.apiUrl}/api/requirement`, requirement, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // 4. Update an existing requirement
  updateRequirement(requirementId: number, requirement: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.apiUrl}/api/requirement/${requirementId}`, requirement, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // 5. Get requirement by trainer Id
  getRequirementByTrainerId(trainerId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/api/requirement/byTrainer/${trainerId}`, { // Changed endpoint for clarity
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // 6. Delete a requirement
  deleteRequirement(requirementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/requirement/${requirementId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Method to assign a trainer to a requirement (as used in coordinator-view-requirements.component.ts)
  assignTrainerToRequirement(requirementId: number, trainerId: number): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.apiUrl}/api/requirement/${requirementId}/assign-trainer/${trainerId}`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
export { Requirement };

