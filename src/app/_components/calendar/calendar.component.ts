import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from 'src/app/_models/calendar';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private courseService: CourseService,
              private authService: AuthserviceService) {
              }

  get f() { return this.calendarformForm.controls; }

  public calendarformForm: FormGroup;
  public submitted = false;
  users: User[] = [];
  selectedDate;
  courses;
  logUser: User;
  showInfo;

  ngOnInit(): void {
    this.logUser = this.authService.userValue;
    console.log(this.logUser.email);
    this.calendarformForm = this.formBuilder.group({
      summary : ['', Validators.required],
      location : ['', Validators.required],
      description : ['', Validators.required],
      timeZone : ['Asia/Calcutta', Validators.required],
      start : ['', Validators.required],
      end : ['', Validators.required],
      recurrence : ['', Validators.required],
      attendees : ['', Validators.required],
      organizer : [''],
      count: ['']
      });

    this.userService.getAll().subscribe(x => this.users = x);
    this.getCoursesByUser();
  }

  getCoursesByUser(){
    this.courseService.getCalendarById(this.logUser.id).
    subscribe(x => {
     this.courses = x;
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.calendarformForm.invalid) {
      return;
    }
    const calendar: Calendar =  {
      summary: this.f.summary.value,
      location: this.f.location.value,
      description: this.f.description.value,
      timeZone: this.f.timeZone.value,
      start: this.f.start.value,
      end: this.f.end.value,
      recurrence: [
        {
          frequency: this.f.recurrence.value,
          count: this.f.count.value,
        }
      ],
      attendees: [
        this.f.attendees.value,
        this.logUser.email
      ],
      organizer: null
    };

    this.courseService.createCalendar(calendar).subscribe(x =>  { console.log(x); this.getCoursesByUser(); } );

}

}
