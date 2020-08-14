import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Calendar
} from 'src/app/_models/calendar';
import {
  UserService
} from 'src/app/_services/user.service';
import {
  User
} from 'src/app/_models/user';
import {
  CourseService
} from 'src/app/_services/course.service';
import {
  AuthserviceService
} from 'src/app/_services/authservice.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventmodelComponent } from '../eventmodel/eventmodel.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private courseService: CourseService,
              private authService: AuthserviceService,
              private modal: NgbModal,
              public dialog: MatDialog) {}

  get f() {
    return this.calendarformForm.controls;
  }

  public calendarformForm: FormGroup;
  public submitted = false;
  users: User[] = [];
  selectedDate;
  courses;
  logUser: User;
  showInfo;
  allChecked = true;
  dayName;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  selectedView = '1';
  activeDayIsOpen = true;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  filterActions = [
    {id: 0 , name: 'Confirmed', checked: false},
    {id: 1 , name: 'Pending', checked: false},
    {id: 2 , name: 'Cancelled', checked: false}
  ];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  ngOnInit(): void {
    this.logUser = this.authService.userValue;
    this.selectedDate = new Date();
    console.log(this.logUser.email);
    this.calendarformForm = this.formBuilder.group({
      summary: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      timeZone: ['Asia/Calcutta', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      recurrence: ['', Validators.required],
      attendees: ['', Validators.required],
      organizer: [''],
      count: ['']
    });

    this.userService.getAll().subscribe(x => this.users = x);
    this.getCoursesByUser();
    this.getEvents();
  }

  getCoursesByUser() {
    this.courseService.getCalendarById(this.logUser.id).
    subscribe(x => {
      this.courses = x;
    });
  }

  getEvents(){
    this.courseService.getCalendars().
    subscribe((x) => {
      x?.items?.forEach(element => {
        this.events.push(
          {
            start: startOfDay(new Date(element.start.dateTime)),
            end: endOfDay(new Date(element.end.dateTime)),
            title: element.summary,
            color: colors.yellow,
            actions: this.actions,
            meta: element,
          },
        );
      });
      this.refresh.next();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.calendarformForm.invalid) {
      return;
    }
    const calendar: Calendar = {
      summary: this.f.summary.value,
      location: this.f.location.value,
      description: this.f.description.value,
      timeZone: this.f.timeZone.value,
      start: this.f.start.value,
      end: this.f.end.value,
      recurrence: [{
        frequency: this.f.recurrence.value,
        count: this.f.count.value,
      }],
      attendees: [
        this.f.attendees.value,
        this.logUser.email
      ],
      organizer: null
    };

    this.courseService.createCalendar(calendar).subscribe(x => {
      console.log(x);
      this.getCoursesByUser();
    });

  }
  changeSelected($event, action) {
    action.checked = !action.checked;
    if (action.checked === true){
      this.allChecked = false;
    }
  }

  changeAllSelected($event){
    this.allChecked = !this.allChecked;
    if (this.allChecked === true){
      this.filterActions.forEach(x => x.checked = false);
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>){
    this.selectedDate = event.value;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(this.modalData);
   // this.modal.open(this.modalContent, { size: 'md' });
    const dialogRef = this.dialog.open(EventmodelComponent, {
      width: '350px',
      data: this.modalData,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
}
