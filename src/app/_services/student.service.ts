import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
