import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClassroomComponent implements OnInit {

  constructor(public auth: AuthserviceService) { }

  colors = {
    background: 'primary',
    font: 'primary'
  };

  ngOnInit(): void {
    if (this.auth.userValue.role === 0){
      this.colors.background = 'secondary';
    }
  }

}
