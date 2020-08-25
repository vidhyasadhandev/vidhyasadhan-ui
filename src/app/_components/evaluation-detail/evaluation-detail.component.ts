import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.css']
})
export class EvaluationDetailComponent implements OnInit {

  constructor() { }

  selectedValue: number;
  starsarray = [1, 2, 3, 4, 5];

  ratingList = [
     {id: 1, name: 'Leadership skills', value: 0, data: this.starsarray},
     {id: 2, name: 'English language knowledge', value: 0, data: this.starsarray},
     {id: 3, name: 'Communication skills', value: 0, data: this.starsarray},
     {id: 4, name: 'Problem solving', value: 0, data: this.starsarray},
     {id: 5, name: 'Programming skills', value: 0, data: this.starsarray},
     {id: 6, name: 'Ability to learning', value: 0, data: this.starsarray},
     {id: 7, name: 'Workflow behavior', value: 0, data: this.starsarray},
     {id: 8, name: 'Sence of humor', value: 0, data: this.starsarray}
  ];

  feedback1;
  feedback2;

  @Input()
  student;

  @Output()
  onSelectValue = new EventEmitter<{isReturn}>();

  ngOnInit(): void {
  }

  startCount(star, rating){
    rating.value = star;
    const sum = this.ratingList.map(a => a.value).reduce((a, b) =>
    {
      return a + b;
    });

    this.selectedValue = sum / 8;
  }

  gotolist(){
    this.onSelectValue.emit( {isReturn: true});
  }

  reset(){
    this.selectedValue = 0;
    this.ratingList.forEach(x => x.value = 0);
    this.feedback1 = null;
    this.feedback2 = null;
  }

  cancel(){
    this.onSelectValue.emit( {isReturn: true});
  }

  onSubmit(){
  }


}
