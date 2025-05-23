import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  public apiUrl = 'http://<url>:8080'; //replace

  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer $ {token}`
    });
}

//1.get all trainer
getAllTrainer(): Observable<Trainer[]>{
  return this.http.get<Trainer[]>(`${this.apiUrl}/api/trainer`, {
    headers: this.getAuthHeaders()
  });
}

//2.get trainer by ID
getTrainerById(trainerId: number): Observable<Trainer>{
  return this.http.get<Trainer>(`${this.apiUrl}/api/trainer/${trainerId}`, {
    headers: this.getAuthHeaders()
  });  
}
 //3.add a new trainer
 addTrainer(trainer:Trainer): Observable<Trainer>{
  return this.http.post<Trainer>(`${this.apiUrl}/api/trainer`,trainer, {
    headers: this.getAuthHeaders()
  });  
}

//4.Update trainer  details
updateTrainer(trainerId: number,trainer: Trainer): Observable<Trainer>{
  return this.http.put<Trainer>(`${this.apiUrl}/api/trainer/${trainerId}`,trainer, {
    headers: this.getAuthHeaders()
  });  
}

//5.Delete a trainer 
deleteTrainer(trainerId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/api/trainer/${trainerId}`,{
    headers: this.getAuthHeaders()
  });  
}

}