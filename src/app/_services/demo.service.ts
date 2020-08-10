import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { Demo } from '../_models/demo';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  getAllDemos(){
    return this.http.get<any>(`${environment.apiUrl}/demos/allcourses`);
  }

  getAllDemosByUser(userid){
    const options = userid ?
    { params: new HttpParams().set('userId', userid)} : {};
    return this.http.get<Demo[]>(`${environment.apiUrl}/demos/GetByUserId`, options);
  }

  getAllDemosByloggedUser(){
  }

  createDemo(demo){
    return this.http.post<any>(`${environment.apiUrl}/demos/create`, demo);
  }
}
