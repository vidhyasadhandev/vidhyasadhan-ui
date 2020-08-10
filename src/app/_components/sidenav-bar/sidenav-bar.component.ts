import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css']
})
export class SidenavBarComponent implements OnInit {
  user;
  IsOpened;
  loginType;

  constructor(private authService: AuthserviceService) {
    this.authService.user.subscribe(x => this.user = x);
    this.authService.loginuser.subscribe(x => {this.loginType = x; console.log(this.loginType);} );
    this.loginType = localStorage.getItem('logtype');
   }

  myWorkRoutes = [
    // {route : 'dashboard', icon: 'dashboard', title: 'Dashboard'},
    {route : 'classroom', icon: 'class', title: 'My Classrom'},
    {route : 'demos', icon: 'assignment', title: 'Demo Requests'},
    {route : 'profile', icon: 'person_outline', title: 'My Profile'},
    {route : 'earnings', icon: 'account_balance', title: 'My Earnings'},
    {route : 'credits', icon: 'connect_without_contact', title: 'My Referrals'},
    // {route : 'calendar', icon: 'calendar_today', title: 'Calendar'},
  ];

  ngOnInit(): void {
    this.IsOpened = this.isAuthenticated ? true : false;
  }

  isAuthenticated(){
    return this.user;
  }

}
