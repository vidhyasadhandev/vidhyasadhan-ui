import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private authService: AuthserviceService) { }


  updateEnrollment(enrollment){
    return this.http.put<any>(`${environment.apiUrl}/students/enrollment`, enrollment);
  }

  getenrollmentsbyTutor(tutorid){
    const options = tutorid ?
    { params: new HttpParams().set('tutorId', tutorid)} : {};
    return this.http.get<any>(`${environment.apiUrl}/students/bytutor`, options);
  }

}
