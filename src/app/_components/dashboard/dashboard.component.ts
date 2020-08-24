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
  profile;

  tutorcards: Dashboard[] = [
    { icon: 'assets/dashboard/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events', value : '20', type: '', class: 'opac-5', path: '/classroom'},
    { icon: 'assets/dashboard/noun-assignment-3202074.svg', text: 'Assign Tasks', subtext : 'Pending tasks', value : '8', type: '', class: 'opac-5', path: '/tasks' },
    { icon: 'assets/dashboard/path.svg', text: 'My Profile', subtext : 'Completed', value : '80%', type: '', class: 'opac-5', path: '/profile' },
    { icon: 'assets/dashboard/my-earnings.svg', text: 'My Earnings', subtext : 'Completed', value : '80%', type: '', class: 'opac-5', path: '/earnings' },
    { icon: 'assets/dashboard/my-referrals.svg', text: 'My Referrals', subtext : 'Rewards', value : '200', type: '', class: 'opac-5', path: '/referrals' }
  ];

  studentcards: Dashboard[] = [
    { icon: 'assets/Student/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events', value : '20', type: '', class: 'opac-5', path: '/classroom' },
    { icon: 'assets/Student/noun-assignment-3202074.svg', text: 'Book Tutor', subtext : 'Pending tasks', value : '8', type: '', class: 'opac-5', path: '/tutors' },
    { icon: 'assets/Student/path.svg', text: 'My Profile', subtext : 'Completed', value : '80%', type: '', class: 'student-profile', path: '/profile' },
    { icon: 'assets/Student/my-earnings.svg', text: 'Study Material', subtext : 'Resources', value : '30', type: '', class: 'opac-5', path: '/materials' },
    { icon: 'assets/Student/chart-pie-36.svg', text: 'Progress Reports', subtext : 'Credits', value : '200', type: '', class: 'opac-5', path: '/progress' }
  ];

  constructor(private authService: AuthserviceService, private userService: UserService) { }

  ngOnInit(): void {
    this.CreateWishes();
    this.user = this.authService.userValue;
    this.userService.getProfileData(this.user.id).subscribe(x => {this.profile = x; console.log(this.profile); });
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

