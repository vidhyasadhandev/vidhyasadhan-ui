import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-noassignments',
  templateUrl: './noassignments.component.html',
  styleUrls: ['./noassignments.component.css']
})
export class NoassignmentsComponent implements OnInit {

  menuItems = [
    {id: 0, value: 'Assignment', icon: 'assignment_turned_in'},
    {id: 1, value: 'Quiz Assignment', icon: 'batch_prediction'},
    // {id: 2, value: 'Question', icon: 'help'},
    // {id: 3, value: 'Material', icon: 'menu_book'},
    {id: 2, value: 'Topic', icon: 'local_library'},
  ];

  @Output() assignmentEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addEvent(item){
    this.assignmentEmitter.emit(item);
  }


}
