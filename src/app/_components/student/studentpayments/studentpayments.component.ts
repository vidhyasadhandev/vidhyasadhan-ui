import {
  WeekDay
} from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  StaticData
} from 'src/app/_models/static';
import {
  StaticdataService
} from 'src/app/_services/staticdata.service';
import {
  UserService
} from 'src/app/_services/user.service';

@Component({
  selector: 'app-studentpayments',
  templateUrl: './studentpayments.component.html',
  styleUrls: ['./studentpayments.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentpaymentsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userservice: UserService,
              private staticdataService: StaticdataService) {}

  detailsForm: FormGroup;
  form2: FormGroup;
  cardForm: FormGroup;
  submitted = false;
  tutors;
  staticData;
  subjects;
  allChecked = false;
  days = [{
      day: 'Monday',
      selected: false
    },
    {
      day: 'Tuesday',
      selected: false
    },
    {
      day: 'Wednesday',
      selected: false
    },
    {
      day: 'Thursday',
      selected: false
    },
    {
      day: 'Friday',
      selected: false
    },
    {
      day: 'Saturday',
      selected: false
    },
    {
      day: 'Sunday',
      selected: false
    }
  ];

  ngOnInit(): void {
    this.detailsForm = this.formBuilder.group({
      tutor: ['', Validators.required],
      subjects: ['', Validators.required],
      teachingstyle: ['', Validators.required],
      days: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['INR', Validators.required],
    });

    this.form2 = this.formBuilder.group({
      options: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hours: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.cardForm = this.formBuilder.group({
      option: ['', Validators.required],
      promo: [''],
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      holderName: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.tutors = this.userservice.getTutors();
    this.getSubjects();
  }

  displayFn(user: any) {
    return user && user.name ? user.name : '';
  }


  getSubjects() {
    this.staticdataService.getStaticDataSets().subscribe(
      data => {
        this.subjects = data.subjects.map(e => {
          return {
            ...e
          };
        });
      }
    );
  }

  get f() {
    return this.detailsForm.controls;
  }

  get secondForm(){
    return this.form2.controls;
  }

  get getGrandTotal(){
    return this.f.price.value * this.secondForm.hours.value;
  }

  getSelectedSubjects(){
    const subjects = [];
    Array.from(this.f.subjects.value)
    .forEach((element: any) => {
      subjects.push(element.group.groupName + '-' + element.name);
    });
    return subjects.join(',');
  }

  getFrequency(){
    const days = [];
    Array.from(this.days)
    .forEach((element: any) => {
      if (element.selected){
        days.push(element.day);
      }
    });
    return days.join(',');
  }

  changeDays(checker, day) {
    day.selected = checker;
    this.allChecked = this.days.filter(t => t.selected).length > 0 ? false : this.allChecked;
  }

  changeAll(completed: boolean) {
    this.allChecked = completed;
    if (this.days == null) {
      return;
    }
    this.days.forEach(t => {
      if (completed === true) {
        t.selected = true;
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.detailsForm.valid) {

    }
  }

}
