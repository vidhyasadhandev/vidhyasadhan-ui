import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from 'src/app/_services/user.service';
import {
  User
} from 'src/app/_models/user';
import * as moment from 'moment';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  DemomodelComponent
} from '../demomodel/demomodel.component';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertboxComponent } from '../alertbox/alertbox.component';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {

  public tutors: any;
  weekArray: string[] = [];
  public slicedTutors: any;
  public searchForm: FormGroup;
  query1;
  query2;
  query3;

  constructor(private userservice: UserService,
              public dialog: MatDialog,
              private authService: AuthserviceService,
              private demoService: DemoService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    this.userservice.getTutors().subscribe(
      x => {
        this.tutors = x;
        this.sliceTutors(x);
      },
      (error) => console.log(error)
    );

    const weekarrays = moment.weekdays();
    weekarrays.join('-');
    this.weekArray.push('Monday to Thursday');
    this.weekArray.push('Friday');
    this.weekArray.push('Saturday, Sunday');
  }

  get f() { return this.searchForm.controls; }

  sliceTutors(tutors){
    this.slicedTutors = tutors?.slice(0, 4);
  }

  createForm(){
    this.searchForm = this.formBuilder.group({
      location : null,
      subject : null,
      tutor: null,
      indicator: null
      });
  }

  bookClass(e, tutor, type) {
    this.selectDemo(e, tutor, type);
  }

  selectDemo(e, tutor, type) {
    const tutordialog =   this.dialog.open(DemomodelComponent, {
      width: '350px',
      data: {
        tutorinfo: tutor,
        student:  this.authService.userValue,
        courses: tutor.account.courseAssignments?.filter(x => x.course?.isDemo === type),
        type
      }
    });
    tutordialog.afterClosed().subscribe(result => {
      if (result !== null){
        this.demoService.requestDemo(result).subscribe(
          x => {
            this._snackBar.openFromComponent(AlertboxComponent, {
              duration: 5000,
              data: { message: x > 0  ? 'Request Sent to Tutor' : 'Unable to Send Request'},
            });

          });
        }
      });
  }

  pagechange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.tutors.length){
      endIndex = this.tutors.length;
    }

    this.slicedTutors = this.tutors.slice(startIndex, endIndex);
  }

  filterItem(){
    let filteredItems = this.tutors;
    if (this.f.location.value !== null &&  this.f.location.value !== undefined){
      const keys = 'address1,city,pincode';
      filteredItems = filteredItems.filter(item =>
        item.location?.address1.toLowerCase().includes(this.f.location.value.toLowerCase())
        || item.location?.city.toLowerCase().includes(this.f.location.value.toLowerCase())
        || item.location?.pincode.toLowerCase().includes(this.f.location.value.toLowerCase()));
    }
    if (this.f.subject.value !== null && this.f.subject.value !== undefined){
      const keys = 'subjects, level';
      filteredItems = filteredItems.filter(item =>
        item.subjects?.toLowerCase().includes(this.f.subject.value.toLowerCase())
        || item.level?.toLowerCase().includes(this.f.subject.value.toLowerCase()));
    }
    if (this.f.tutor.value !== null && this.f.tutor.value !== undefined){
      const keys = 'name';
      filteredItems = filteredItems.filter(item =>
        item.name?.toLowerCase().includes(this.f.tutor.value.toLowerCase()));
    }
    this.slicedTutors = filteredItems.slice(0, 4);
  }

  getDisabled(tutor, item){
    if (item){
      const demos = tutor.account.courseAssignments?.filter(x => x.course?.isDemo === true);
      return !(demos?.length > 0);
    }
    else{
      const classes = tutor.account.courseAssignments?.filter(x => x.course?.isDemo === false);
      return !(classes?.length > 0);
    }
  }

}
