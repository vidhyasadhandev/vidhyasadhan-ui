import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Profile } from '../_models/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/` + id);
  }

  getStudents() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/students`);
  }

  getTutors() {
    return this.http.get<any>(`${environment.apiUrl}/instructors`);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/allusers`);
  }

  addUser(user: User){
    return this.http.post<boolean>(`${environment.apiUrl}/users/register`, user);
  }

  getProfileData(userid){
    const options = userid ?
    { params: new HttpParams().set('userId', userid) } : {};
    return this.http.get<Profile>(`${environment.apiUrl}/users/profile`, options);
  }

  updateProfileData(profile){
    return this.http.put<boolean>(`${environment.apiUrl}/users/update`, profile);
  }

  updateUser(){

  }

  deleteUser(){
  }

  uploadprofilepic(file){
    return this.http.post<User>(`${environment.cloudinary.url}/upload`, file);
  }

}
