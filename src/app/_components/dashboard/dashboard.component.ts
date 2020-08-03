import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';
import { Dashboard } from 'src/app/_models/dashboard';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greetmessage;
  user: User;
  cards: Dashboard[];
  istutor: boolean;

  tutorcards: Dashboard[] = [
    { icon: 'assets/dashboard/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events', value : '20', type: '' },
    { icon: 'assets/dashboard/noun-assignment-3202074.svg', text: 'Assign Tasks', subtext : 'Pending tasks', value : '8', type: '' },
    { icon: 'assets/dashboard/path.svg', text: 'My Profile', subtext : 'Completed', value : '80%', type: '' },
    { icon: 'assets/dashboard/chart-pie-36.svg', text: 'My Credits', subtext : 'Reward points', value : '200', type: '' }
  ];

  studentcards: Dashboard[] = [
    { icon: 'assets/Student/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events', value : '20', type: '' },
    { icon: 'assets/Student/noun-assignment-3202074.svg', text: 'Book Tutor', subtext : 'Pending tasks', value : '8', type: '' },
    { icon: 'assets/Student/path.svg', text: 'My Profile', subtext : 'Completed', value : '80%', type: '', class: 'student-profile' },
    { icon: 'assets/Student/my-earnings.svg', text: 'My Payments', subtext : 'Completed', value : '80%', type: '' },
    { icon: 'assets/Student/chart-pie-36.svg', text: 'Progress Reports', subtext : 'Reward points', value : '200', type: '' }
  ];

  constructor(private authService: AuthserviceService, private userService: UserService) { }

  ngOnInit(): void {
    this.CreateWishes();
    this.user = this.authService.userValue;
    console.log(this.user.role);
    this.istutor = this.user.role === 1;
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

