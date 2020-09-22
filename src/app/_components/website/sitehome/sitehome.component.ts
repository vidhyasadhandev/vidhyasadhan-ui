import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitehome',
  templateUrl: './sitehome.component.html',
  styleUrls: ['./sitehome.component.css']
})
export class SitehomeComponent implements OnInit {

  constructor() { }
  date: Date;
  images = [];

  ngOnInit(): void {
    this.date = new Date();
    this.loadImages();
  }

  loadImages(){
    for (let index = 0; index < 4; index++) {
      const element = {
        id: index,
        image1: 'assets/website/bg-svg/mg-' + (index + 1) + '.png',
        image2: 'assets/website/bg-svg/mg-' + (index + 1) + '-1.png 2x,' + 'assets/website/bg-svg/mg-' + (index + 1) + '-2.png 3x',
        image3: 'assets/website/bg-svg/mg-' + (index + 1) + '-2',
      };
      this.images.push(element);
    }
  }

}
