import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitehome',
  templateUrl: './sitehome.component.html',
  styleUrls: ['./sitehome.component.css']
})
export class SitehomeComponent implements OnInit {

  constructor() { }
  date: Date;

  ngOnInit(): void {
    this.date = new Date();
  }

}
