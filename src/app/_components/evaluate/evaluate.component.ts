import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  DemoService
} from 'src/app/_services/demo.service';
import {
  AuthserviceService
} from 'src/app/_services/authservice.service';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  CourseService
} from 'src/app/_services/course.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit, AfterViewInit {

  constructor(private demoService: DemoService,
              private authService: AuthserviceService,
              private assignments: CourseService) {
    this.getassigments();
  }

  sortoptions = [{
      id: 0,
      value: 'Most Recent'
    },
    {
      id: 1,
      value: 'Oldest'
    }
  ];

  doEvaluate = false;

  resultsLength = 0;
  dataSource: MatTableDataSource < any > ;
  primary = 'primary';
  selectedValue = 0;
  selectedCourse;
  isLoading;
  courses;
  selectedRow;
  displayedColumns: string[] = ['name', 'grade', 'period', 'topic', 'attachment', 'status', 'points', 'action'];

  @ViewChild(MatPaginator, {
    static: false
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: false
  }) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getassigments();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displaycourse(course) {
    return course.title;
  }

  getassigments() {
    this.assignments.getTutorStudentAssignments(this.authService.userValue.id).subscribe((x: []) => {
      this.dataSource.data = x;
      return x;
    });
  }

  applyFilter(filterValue) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actionSelected(row) {
    this.doEvaluate = true;
    this.selectedRow = row;
  }

  selectValue(event) {
    if (event.isReturn) {
      this.doEvaluate = false;
    }
  }

  downloadFile(file: string) {
    if (file?.length > 0) {
      window.open(file);
    }
  }

}
