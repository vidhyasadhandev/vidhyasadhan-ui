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
message;

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
  }
}
