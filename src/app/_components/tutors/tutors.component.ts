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

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {

  tutors: User[];
  weekArray: string[] = [];

  constructor(private userservice: UserService,
              public dialog: MatDialog,
              private authService: AuthserviceService,
              private demoService: DemoService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userservice.getAll().subscribe(
      x => {
        this.tutors = x;
      },
      (error) => console.log(error)
    );

    const weekarrays = moment.weekdays();
    weekarrays.join('-');
    this.weekArray.push('Monday to Thursday');
    this.weekArray.push('Friday');
    this.weekArray.push('Saturday, Sunday');
  }

  bookClass(e, tutor) {

  }

  selectDemo(e, tutor) {
    const tutordialog =   this.dialog.open(DemomodelComponent, {
      width: '350px',
      data: {
        tutorinfo: tutor,
        student:  this.authService.userValue,
      }
    });
    tutordialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== null){
        this.demoService.requestDemo(result).subscribe(
          x => {
            this._snackBar.openFromComponent(AlertboxComponent, {
              duration: 5000,
              data: { message: x === 1 ? 'succesfully requested a demo' : 'Unable to Create Demo'},
            });

          });
        }
      });
  }

}
