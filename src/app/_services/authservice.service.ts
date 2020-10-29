import {
  Injectable, OnDestroy
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
  HttpClient, HttpHeaders, HttpParams
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
export class AuthserviceService implements OnDestroy {

  constructor(private router: Router,
              private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

    this.loginSubject = new BehaviorSubject<string>(localStorage.getItem('logtype'));
    this.loginuser = this.loginSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get userType(): string {
    return this.loginSubject.value;
  }


  private userSubject: BehaviorSubject < User > ;
  public user: Observable < User > ;

  private loginSubject: BehaviorSubject < string >;
  public loginuser: Observable < string > ;

  private refreshTokenTimeout;

  ngOnDestroy(){
    localStorage.removeItem('logtype');
  }

  setLoginSubject(type){
    localStorage.setItem('logtype', type);
    this.loginSubject.next(type);
  }

  login(username: string, password: string, role: number) {
    return this.http.post < any > (`${environment.apiUrl}/users/authenticate`, {
       email : username,
       password,
       rememberMe: false,
       role
      }, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
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
    this.http.post < any > (`${environment.apiUrl}/users/logout`, {}, {
      withCredentials: true
    }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  tokenRefresh() {
    const usert: User = JSON.parse(localStorage.getItem('user')) ;
    return this.http.post < any > (`${environment.apiUrl}/users/refreshtoken`, {
      Token: usert?.refreshToken
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
      })
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer() {
    console.log('user' + this.userValue);
    const jwtToken = JSON.parse(atob(this.userValue?.jwtToken.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.tokenRefresh().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  confirmEmail(user){
    const options = user ?
    { params: new HttpParams().set('userId', user.userId).append('token', user.token) } : {};
    return this.http.get<any>(`${environment.apiUrl}/users/confirm`, options);
  }

  reConfirm(user: User){
    const options = user ?
    { params: new HttpParams().set('emailid', user.email)} : {};
    return this.http.get<any>(`${environment.apiUrl}/users/reconfirm`, options);
  }

  verifyotp(userid, otp: string){
    const options = otp ?
    { params: new HttpParams().set('code', otp).append('email', userid )} : {};
    return this.http.get<any>(`${environment.apiUrl}/users/verifycode`, options);
  }

  resendotp(emailId){
    const options = emailId ?
    { params: new HttpParams().set('email', emailId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/users/regeneratecode`, options);
  }

  forgotpassword(passwordmodel){
    return this.http.post<boolean>(`${environment.apiUrl}/users/password/reset`, passwordmodel);
  }

}
