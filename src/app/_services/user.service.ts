import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/` + id);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/allusers`);
  }

  addUser(user: User){
    return this.http.post<User>(`${environment.apiUrl}/users/register`, user);
  }

  updateUser(){

  }

  deleteUser(){
  }

}
