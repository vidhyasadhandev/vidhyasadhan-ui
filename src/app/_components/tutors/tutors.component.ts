import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {

  tutors: User[];

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.getAll().subscribe(
      x => {this.tutors = x; },
      (error) => console.log(error)
    );
  }

}
