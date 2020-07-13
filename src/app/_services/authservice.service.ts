import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  User
} from '../_models/user';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  map
} from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private router: Router,
              private http: HttpClient) {
    this.userSubject = new BehaviorSubject < User > (null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private userSubject: BehaviorSubject < User > ;
  public user: Observable < User > ;

  private refreshTokenTimeout;
  login(username: string, password: string) {
    return this.http.post < any > (`${environment.apiUrl}/user/authenticate`, {
       email : username,
       password,
       rememberMe: false
      }, {
        withCredentials: true
      })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.http.post < any > (`${environment.apiUrl}/user/logout`, {}, {
      withCredentials: true
    }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  tokenRefresh() {
    const usert = JSON.parse(localStorage.getItem('user')) ;
    console.log(this.userSubject.value);
    return this.http.post < any > (`${environment.apiUrl}/user/refreshtoken`, usert, {
        withCredentials: true
      })
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.tokenRefresh().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
