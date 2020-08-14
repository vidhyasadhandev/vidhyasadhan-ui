import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClassroomComponent implements OnInit {

  constructor() { }

  colors = {
    background: 'primary',
    font: 'primary'
  };

  ngOnInit(): void {
  }

}
