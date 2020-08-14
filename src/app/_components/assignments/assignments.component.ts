import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor() { }

  menuItems = [
    {id: 0, value: 'Assignment', icon: 'assignment_turned_in'},
    {id: 0, value: 'Quiz Assignment', icon: 'batch_prediction'},
    {id: 0, value: 'Question', icon: 'help'},
    {id: 0, value: 'Material', icon: 'menu_book'},
    {id: 0, value: 'Topic', icon: 'local_library'},
  ];

  ngOnInit(): void {
  }

}
