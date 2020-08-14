import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Attendance } from '../_models/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getattendances(courseid){
    const options = courseid ?
    { params: new HttpParams().set('id', courseid)} : {};
    return this.http.get<any[]>(environment.apiUrl + `/attendance/getbycourseid`, options);
  }

  saveattendance(attendances: Attendance[]){
    return this.http.post(environment.apiUrl + `/attendance`, attendances);
  }
}
