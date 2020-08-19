import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DemoService
} from 'src/app/_services/demo.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-demodetail',
  templateUrl: './demodetail.component.html',
  styleUrls: ['./demodetail.component.css']
})
export class DemodetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private demoService: DemoService) {}
  courseId;
  demo;
  enrollments: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'phone'];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      if (this.courseId !== null && this.courseId !== undefined) {
        this.demoService.getDemoById(this.courseId).subscribe(x => {
          this.demo = x;
          const enrollmentarray = [];
          this.demo.enrollments?.forEach(e => {
            enrollmentarray.push({
              name : e.student.firstName + ' ' + e.student.lastName,
              email: e.student.email,
              phone: e.student.phoneNumber
            });
          });
          this.enrollments = new MatTableDataSource(enrollmentarray);
        });
      }
    });



  }

}
