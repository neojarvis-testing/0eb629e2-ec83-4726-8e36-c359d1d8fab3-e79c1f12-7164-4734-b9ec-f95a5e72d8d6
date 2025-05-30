import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  public apiUrl = 'https://8080-eabeaccbadfdeebeedbbcceabbdaabecfbecfaedd.project.examly.io'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer $ {token}`
    });
}

 //1. Send FeedBack
 sendFeedback(feedback: Feedback): Observable<Feedback>{
  return this.http.post<Feedback>(`${this.apiUrl}/api/feedback`, feedback, {
    headers: this.getAuthHeaders()
  });
}
 
//2. Get feedback by User Id
getAllFeedbackByUserId(userId: number): Observable<Feedback[]>{
  return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`, {
    headers: this.getAuthHeaders()
  });
}

//3. Delete Feedback
deleteFeedback(feedbackId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/api/feedback/${feedbackId}`,{
    headers: this.getAuthHeaders()
  });  
}

//4. Get all feedback
getFeedbacks(): Observable<Feedback[]>{
  return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`, {
    headers: this.getAuthHeaders()
  });
}


}
export { Feedback };

