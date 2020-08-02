import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';
import { Dashboard } from 'src/app/_models/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greetmessage;
  user: User;

  columns: Dashboard[] = [
    { icon: 'assets/dashboard/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events', value : '20', type: '' },
    { icon: 'assets/dashboard/noun-assignment-3202074.svg', text: 'Assign Tasks', subtext : 'Pending tasks', value : '8', type: '' },
    { icon: 'assets/dashboard/path.svg', text: 'My Profile', subtext : 'Completed', value : '80%', type: '' },
    { icon: 'assets/dashboard/chart-pie-36.svg', text: 'My Credits', subtext : 'Reward points', value : '200', type: '' }
  ];

  constructor(private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.CreateWishes();
    this.user = this.authService.userValue;
  }


  private CreateWishes() {
    const today = new Date();
    const hours = today.getHours();

    if (hours < 12) {
      this.greetmessage = 'Good Morning';
    }
    else if (hours >= 12 && hours <= 17) {
      this.greetmessage = 'Good Afternoon';
    }
    else if (hours >= 17 && hours <= 24) {
      this.greetmessage = 'Good Evening';
    }
  }
}

