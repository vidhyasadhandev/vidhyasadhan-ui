import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AttendanceService } from 'src/app/_services/attendance.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit, AfterViewInit {

  constructor(private student: StudentService,
              private authService: AuthserviceService) { }

  sortoptions = [
    {id: 0, value: 'Most Recent'},
    {id: 1, value: 'Oldest'}
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'course', 'coursedate', 'sessions', 'status', 'amount'];
  selectedValue = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getenrollements();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

  getenrollements(){
    this.student.getenrollmentsbyTutor(this.authService.userValue.id)
    .subscribe(x => { console.log(x); this.dataSource.data = x; return x; });
  }

  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actionSelected(row){
  }

}
