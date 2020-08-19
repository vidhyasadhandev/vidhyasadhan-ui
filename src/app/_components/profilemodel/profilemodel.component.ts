import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilemodel',
  templateUrl: './profilemodel.component.html',
  styleUrls: ['./profilemodel.component.css']
})
export class ProfilemodelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public dropped(files) {
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

}
