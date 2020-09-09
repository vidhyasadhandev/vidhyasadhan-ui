import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { Calendar, CalendarResponse } from '../_models/calendar';
import { Demo } from '../_models/demo';

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
      const options = userid ? { params: new HttpParams().set('userId', userid)} : {};
      return this.http.get<Demo[]>(`${environment.apiUrl}/demos/GetByUserId`, options);
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

  createAssignment(assignment){
    return this.http.post<any>(`${environment.apiUrl}/assignments/save`, assignment);
  }

  addstudentstoassignment(assignments){
    return this.http.post<any>(`${environment.apiUrl}/assignments/addusers`, assignments);
  }

  getAssignmentByTutor(userId){
    const options = userId ?
      { params: new HttpParams().set('id', userId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/assignments/tutor`, options);
  }

  getStudentAssignments(userId){
    const options = userId ?
      { params: new HttpParams().set('id', userId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/assignments/student`, options);
  }

  updateStudentAssignments(assignment){
    return this.http.put<any>(`${environment.apiUrl}/assignments/student/update`, assignment);
  }

  getTutorStudentAssignments(userId){
    const options = userId ?
      { params: new HttpParams().set('id', userId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/assignments/studentassignments/tutor`, options);
  }

}
