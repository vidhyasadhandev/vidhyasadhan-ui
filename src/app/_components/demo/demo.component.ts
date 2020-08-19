import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Demo } from 'src/app/_models/demo';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { StaticdataService } from 'src/app/_services/staticdata.service';
import { LocationModel } from 'src/app/_models/location';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

public demoForm: FormGroup;
public submitted = false;
isLoading;
locations: LocationModel[] = [];
timestamps;
isSuccess;
demos;

eventcolors = [
  {color: 'Red', code: ''},
  {color: 'Yellow', code: ''},
  {color: 'Blue', code: ''},
  {color: 'Blue', code: ''}
];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthserviceService,
              private demoService: DemoService,
              private staticData: StaticdataService) { }

  ngOnInit(): void {
    this.demoForm = this.formBuilder.group({
      courseId : [''],
      title : ['', Validators.required],
      courseDescription : ['', Validators.required],
      demoDate : [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      credits : [''],
      departmentID : [''],
      courseAssignments : [''],
      enrollments : [''],
      location: ['', Validators.required],
      video: ['', Validators.required],
      calendar: [''],
      eventcolor: [''],
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
    this.getDemos();
  }

  getDemos(){
    this.demoService.getAllDemosByUser(this.authService.userValue.id).subscribe(
      x => (this.demos = x), (error) => console.log(error)
    );
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
        courseDescription: this.demoFormControls.courseDescription.value,
        startDate: this.getDateforTimes(this.demoFormControls.demoDate.value, this.demoFormControls.startTime.value),
        endDate: this.getDateforTimes(this.demoFormControls.demoDate.value, this.demoFormControls.endTime.value),
        courseAssignments: [{
          instructorID: this.authService.userValue.id,
          courseID: null
        }],
        enrollments: [{
          enrollmentID: 0,
          courseID: null,
          studentID: this.authService.userValue.id
        }],
        locationName: this.demoFormControls.location.value.locationName,
        locationId: this.demoFormControls.location.value.locationId,
        langitude: this.demoFormControls.location.value.langitude,
        latitude: this.demoFormControls.location.value.latitude,
        calendarEvent: {
          summary: this.demoFormControls.title.value,
          location: this.demoFormControls.location.value.locationName,
          description: this.demoFormControls.courseDescription.value,
          timeZone: 'Asia/Calcutta',
          start: this.getDateforTimes(this.demoFormControls.demoDate.value, this.demoFormControls.startTime.value),
          end: this.getDateforTimes(this.demoFormControls.demoDate.value, this.demoFormControls.endTime.value),
          recurrence: null,
          attendees: [
            this.authService.userValue.email
          ],
          organizer: null
        }
      };
      console.log(demodata);
      this.demoService.createDemo(demodata).subscribe(x => console.log(x),
     (error) => console.log(error));
    }
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
}
