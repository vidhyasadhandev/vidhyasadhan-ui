import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { StaticdataService } from 'src/app/_services/staticdata.service';
import { LocationModel } from 'src/app/_models/location';
import * as moment from 'moment';
import { Demo } from 'src/app/_models/demo';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthserviceService,
              private demoService: DemoService,
              private staticData: StaticdataService) { }

  public demoForm: FormGroup;
  public submitted = false;
  isLoading;
  locations: LocationModel[] = [];
  message;
  timestamps;

  @Output() returnEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.demoForm = this.formBuilder.group({
      courseId : [''],
      title : ['', Validators.required],
      subject: ['', Validators.required],
      courseDescription : ['', Validators.required],
      startDate : [new Date(), Validators.required],
      endDate : [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      credits : [''],
      grade: ['', Validators.required],
      departmentID : [''],
      courseAssignments : [''],
      enrollments : [''],
      location: ['', Validators.required],
      video: ['', Validators.required],
      calendar: [''],
      eventType: [''],
      notificationtype: ['Email', Validators.required],
      remaindertime: ['10', Validators.required],
      timer: ['Minutes', Validators.required]
    });

    this.demoForm
    .get('location')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.staticData.searchLocations(value)
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe((locs) => {
      this.locations = [];
      locs?.features?.forEach(element => {
        const location: LocationModel = {
          locationId: element.id,
          locationName: element.place_name,
          langitude: element.geometry?.coordinates[0],
          latitude: element.geometry?.coordinates[1]
        };
        this.locations.push(location);
      });
    });

    this.getTimeLabels();
  }


  getTimeLabels(){
    const times = (desiredStartTime, interval, period) => {
      const periodsInADay = moment.duration(1, 'day').as(period);
      const timeLabels = [];
      const startTimeMoment = moment(desiredStartTime, 'hh:mm');
      for (let i = 0; i <= periodsInADay; i += interval) {
        startTimeMoment.add(i === 0 ? 0 : interval, period);
        timeLabels.push(startTimeMoment.format('hh:mm A'));
      }
      return timeLabels;
    };
    this.timestamps = times('00:00', 15, 'minutes');
  }

  displayLoc(loc): string {
    return loc ? loc.locationName : '';
  }

  get demoFormControls() { return this.demoForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.demoForm.valid) {
      const demodata: Demo = {
        title: this.demoFormControls.title.value,
        courseId: null,
        credits: 0,
        departmentID: null,
        subject: this.demoFormControls.subject.value,
        grade: this.demoFormControls.grade.value,
        courseDescription: this.demoFormControls.courseDescription.value,
        startDate: this.demoFormControls.startDate.value,
        endDate: this.demoFormControls.endDate.value,
        startTime: this.demoFormControls.startTime.value,
        endTime: this.demoFormControls.endTime.value,
        courseAssignments: [{
          instructorID: this.authService.userValue.id,
          courseID: null
        }],
        enrollments: [],
        locationName: this.demoFormControls.location.value.locationName,
        locationId: this.demoFormControls.location.value.locationId,
        langitude: this.demoFormControls.location.value.langitude,
        latitude: this.demoFormControls.location.value.latitude,
        calendarEvent: {
          summary: this.demoFormControls.title.value,
          location: this.demoFormControls.location.value.locationName,
          description: this.demoFormControls.courseDescription.value,
          timeZone: 'Asia/Calcutta',
          start: this.getDateforTimes(this.demoFormControls.startDate.value, this.demoFormControls.startTime.value),
          end: this.getDateforTimes(this.demoFormControls.startDate.value, this.demoFormControls.endTime.value),
          recurrence: [{frequency: 'DAILY', count: this.dayDiff(this.demoFormControls.startDate.value,
            this.demoFormControls.endDate.value)}],
          attendees: [
            this.authService.userValue.email
          ],
          organizer: null,
        },
        isDemo: this.demoFormControls.eventType.value === 'Demo'
      };
      console.log(demodata);
      this.demoService.createDemo(demodata).subscribe(x => {
        if ( x >= 0){
          this.message = 'succesfully created demo';
        }
        else{
          this.message = 'Unable to create demo';
        }
      },
     (error) => this.message = error);
    }

    this.gotoList();
  }

  getDateforTimes(date: Date, time){
    const Year = Number(date.getFullYear());
    const Month = Number(date.getMonth());
    const Day = Number(date.getDate());

    const paseddate =   this.parseDaytime(time);
    const convertedDate = new Date(Year, Month, Day, paseddate[0], paseddate[1]);
    console.log(convertedDate);
    return convertedDate;
  }

  dayDiff(d1: Date, d2: Date)
  {
    const diff = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

   parseDaytime(converttime) {
    const dtime = converttime.split(':');
    let hours = dtime[0];
    const minutes = dtime[1].split(' ')[0];
    if (converttime.includes('pm') && hours !== 12) { hours += 12; }
    return [hours, minutes];
  }

  resetForm(){
    this.submitted = false;
    this.demoForm.reset();
  }

  gotoList(){
    this.returnEvent.emit(true);
  }

}


// [{
//   enrollmentID: 0,
//   courseID: null,
//   studentID: this.authService.userValue.id
// }]