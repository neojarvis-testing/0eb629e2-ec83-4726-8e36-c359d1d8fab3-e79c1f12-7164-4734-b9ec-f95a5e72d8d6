import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Requirement } from '../models/requirement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  public apiUrl = 'http://<url>:8080'; //replace

  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer $ {token}`
    });

  }
//1.get all requirements
  getAllRequirements(): Observable<Requirement[]>{
    return this.http.get<Requirement[]>(`${this.apiUrl}/api/requirement`, {
      headers: this.getAuthHeaders()
    });
  }

  //2.get requirement by Id
  getRequirementById(requirementId: number): Observable<Requirement>{
    return this.http.get<Requirement>(`${this.apiUrl}/api/requirement/${requirementId}`, {
      headers: this.getAuthHeaders()
    });  
  }

  //3. Add a new requirement
  addRequirement(requirement:Requirement): Observable<Requirement>{
    return this.http.post<Requirement>(`${this.apiUrl}/api/requirement`,requirement, {
      headers: this.getAuthHeaders()
    });  
  }

  //4.Update an existing requirement 
  updateRequirement(requirementId: number,requirement: Requirement): Observable<Requirement>{
    return this.http.put<Requirement>(`${this.apiUrl}/api/requirement/${requirementId}`,requirement, {
      headers: this.getAuthHeaders()
    });  
  }

  //5. Get requirement by trainer Id
  getRequirementByTrainerId(trainerId: number): Observable<Requirement[]>{
    return this.http.get<Requirement[]>(`${this.apiUrl}/api/requirement/${trainerId}`, {
      headers: this.getAuthHeaders()
    });  
  }

  //6. Delete a requirement
  deleteRequirement(requirementId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/requirement/${requirementId}`,{
      headers: this.getAuthHeaders()
    });  
  }

}

export { Requirement };
