import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-adminstudents',
  templateUrl: './adminstudents.component.html',
  styleUrls: ['./adminstudents.component.css']
})
export class AdminstudentsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  error;

  constructor(private userService: UserService, private alertService: AlertService) { }

  displayedColumns: string[] = ['sno', 'name', 'email', 'profilePic', 'phone'];
  dataSource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadStudents(){
    this.userService.getStudents().subscribe(x => {
      this.dataSource.data = x;
    }, (error) => {
      this.alertService.error(error);
    });
  }

  click(event, row){

  }

  applyFilter(eve){
    const filterValue = (eve.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
