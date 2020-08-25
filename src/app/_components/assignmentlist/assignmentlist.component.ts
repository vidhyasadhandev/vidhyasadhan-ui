import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit {

  constructor() { }

  @Input()
  assignments;

  @Input()
  filter;

  ngOnInit(): void {
  }

  pagechange(event){

  }

}
