import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { Calendar, CalendarResponse } from '../_models/calendar';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private authService: AuthserviceService) {
  }

  getAllCourses(){
    return this.http.get<any>(`${environment.apiUrl}/courses/allcourses`);
  }

  getAllCoursesByUser(userid){
  }

  getAllCoursesByloggedUser(){
  }

  createCourse(course){
    return this.http.post<any>(`${environment.apiUrl}/courses​/create`, course);
  }
 
  getCalendars(){
    return this.http.get<any>(`${environment.apiUrl}/Calendar`);
  }

  getCalendarById(userId){
    return this.http.get<CalendarResponse>(`${environment.apiUrl}/Calendar`);
  }

  createCalendar(calendar){
    return this.http.post<any>(`${environment.apiUrl}/Calendar`, calendar);
  }

}
