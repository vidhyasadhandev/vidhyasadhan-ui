import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';
import { Dashboard } from 'src/app/_models/dashboard';
import { UserService } from 'src/app/_services/user.service';
import { StaticdataService } from 'src/app/_services/staticdata.service';
import { Statistics } from 'src/app/_models/static';

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
  statistics: Statistics;
  profile;

  tutorcards: Dashboard[] = [
    {id: 0, icon: 'assets/dashboard/noun-teaching-2380320.svg', text: 'My Classroom', subtext : 'Events',
                                                          value : '0', type: '', class: 'opac-5', path: '/classroom'},
    {id: 1, icon: 'assets/dashboard/noun-assignment-3202074.svg', text: 'Requests',
    subtext : 'Pending tasks', value : '0', type: '', class: 'opac-5', path: '/requests' },
    {id: 2, icon: 'assets/dashboard/path.svg', text: 'My Profile', subtext : 'Completed',
    value : '0%', type: '', class: 'opac-5',
    path: '/profile' },
    {id: 3, icon: 'assets/dashboard/vector.svg', text: 'My Events', subtext : 'Completed',
    value : '0', type: '', class: 'opac-5', path: '/events' },
    {id: 4, icon: 'assets/dashboard/my-earnings.svg', text: 'My Earnings',
    subtext : 'Completed', value : '0', type: '', class: 'opac-5', path: '/earnings' },
    {id: 5, icon: 'assets/dashboard/my-referrals.svg', text: 'My Referrals',
    subtext : 'Rewards', value : '0', type: '', class: 'opac-5', path: '/tutor-referrals' }
  ];

  studentcards: Dashboard[] = [
    {id: 0, icon: 'assets/Student/noun-teaching-2380320.svg', text: 'My Classroom',
    subtext : 'Events', value : '0',
                                                        type: '', class: 'opac-5', path: '/classroom' },
    {id: 1, icon: 'assets/Student/noun-assignment-3202074.svg', text: 'Book Tutor', subtext : 'Pending tasks', value : '8', type: '', class: 'opac-5', path: '/tutors' },
    {id: 2, icon: 'assets/Student/path.svg', text: 'My Profile',
                                                      subtext : 'Completed', value : '0%', type: '', class: 'student-profile', path: '/profile' },
    {id: 3, icon: 'assets/Student/my-earnings.svg',
                                  text: 'Study Material', subtext : 'Resources', value : '0', type: '', class: 'opac-5', path: '/student/assignments' },
    {id: 4, icon: 'assets/Student/chart-pie-36.svg', text: 'Progress Reports',
                                  subtext : 'Credits', value : '0', type: '', class: 'opac-5', path: '/progress' }
  ];

  constructor(private authService: AuthserviceService, private userService: UserService,
              private staticService: StaticdataService) { }

  ngOnInit(): void {
    this.CreateWishes();
    this.user = this.authService.userValue;
    this.userService.getProfileData(this.user.id).subscribe(x => {this.profile = x; });
    this.istutor = this.user.role === 1;
    this.staticService.getStatistics(this.authService.userValue.id).subscribe(x => {
      this.statistics = x;
      if (this.istutor){
        this.tutorcards[0].value = this.statistics?.events.total.toString();
        this.tutorcards[1].value = this.statistics?.events.total.toString();
        this.tutorcards[2].value = this.statistics?.profiles.total.toString() + '%';
        this.tutorcards[3].value = this.statistics?.events.total.toString();
        this.tutorcards[4].value = this.statistics?.earnings.total.toString();
        this.tutorcards[5].value = this.statistics?.progress.total.toString();
      }
      else{
        this.studentcards[0].value = this.statistics?.events.total.toString();
        this.studentcards[1].value = this.statistics?.events.total.toString();
        this.studentcards[2].value = this.statistics?.profiles.total.toString() + '%';
        this.studentcards[3].value = this.statistics?.materials.total.toString();
        this.studentcards[4].value = this.statistics?.progress.total.toString();
      }
    });
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

