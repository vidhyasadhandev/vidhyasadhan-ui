import { Component, OnInit } from '@angular/core';
import { Demo, Enrollment } from 'src/app/_models/demo';
import { DemoService } from 'src/app/_services/demo.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StudentService } from 'src/app/_services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertboxComponent } from '../alertbox/alertbox.component';

@Component({
  selector: 'app-demolist',
  templateUrl: './demolist.component.html',
  styleUrls: ['./demolist.component.css']
})
export class DemolistComponent implements OnInit {

  selectedAction ;
  isOnline = false;
  demos: Demo[] = [];
  actions = [
    {id: 1, action : 'Accept', icon: 'check_circle', color: 'primary', title: 'List View'},
    {id: 2, action : 'Reject', icon: 'cancel', color: 'warn', title: 'List View'},
    {id: 3, action : 'Re-Schedule', icon: 'alt_route', color: 'accent', title: 'List View'},
  ];

  actionIcons = [
    {id: 0, action : 'clicklist', icon: 'view_list', title: 'List View'},
    {id: 1, action : 'clickdemo', icon: 'view_module', title: 'Demo View'},
    {id: 2, action : 'clickmap', icon: 'map', title: 'Map View'},
  ];


  constructor(private demoService: DemoService,
              private authService: AuthserviceService,
              private studentService: StudentService,
              private snackBar: MatSnackBar,
              private alertcomponent: AlertboxComponent) { }


  ngOnInit(): void {
    this.selectedAction = this.actionIcons[0];
    this.demoService.getAllDemosByUser(this.authService.userValue.id)
    .subscribe(x => this.demos = x, (error) => console.log(error));
  }

  getDaywithFormat(day: Demo){
    const setDate = new Date(day.startDate);
    if (setDate){
      return setDate.getDay();
    }
  }

  changeSelected(e, action, enrollment){
    this.updateEnrollment(enrollment, action.id);
    console.log(action);
  }

  updateEnrollment(enrollment: Enrollment, status){
    enrollment.status = status;
    this.studentService.updateEnrollment(enrollment).subscribe(x => {
  if (x < 0){
    this.openSnackBar('Unable to Complete', 1);
  }
  else{
    this.openSnackBar('Notified Student', null);
  }
}, (error) => {
  this.openSnackBar(error, 1);
});
  }

  openSnackBar(alert, error) {
    this.snackBar.openFromComponent(AlertboxComponent, {
      duration: 5 * 1000,
      data: { message: alert }
    });
  }
  // getAdress(day: Demo){
  //   const address = day.enrollments[0].student.addresses[0];
  //   return address.address1  + ',' + address.address2 + ',' + address.city
  // }

}
