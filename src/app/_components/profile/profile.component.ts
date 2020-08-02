import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { StaticdataService } from 'src/app/_services/staticdata.service';
import { StaticData } from 'src/app/_models/static';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  staticData: StaticData;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
 'Friday', 'Saturday', 'Sunday'];
 allChecked = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private staticdataService: StaticdataService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: [{ value: '', disabled: true }, Validators.required],
      lastname: [{ value: '', disabled: true }, Validators.required],
      profilemail: [{ value: '', disabled: true }, Validators.required],
      profilephone: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      birthdate: [{ value: '', disabled: true }, Validators.required],
      profilePic: [`assets/profile-pic.svg`],
      streetAddress1: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      inputCity: ['', Validators.required],
      stateCode: ['', Validators.required],
      inputPin: ['', Validators.required],
      national: ['', Validators.required],
      backgroundtype: ['', Validators.required],
      medium: ['', Validators.required],
      subject: ['', Validators.required],
      board: ['', Validators.required],
      standard: ['', Validators.required],
      qualification: ['', Validators.required],
      isteacher: ['', Validators.required],
      tutorexp: ['', Validators.required],
      tutorpreference: ['', Validators.required],
      dayselection: ['', Validators.required],
      distance: ['', Validators.required],
      timing: ['', Validators.required],
      rate: ['', Validators.required],
      currency: ['', Validators.required],
      proof: ['', Validators.required],
      demo: ['', Validators.required],
      interests: ['', Validators.required],
    });
    this.getUser();
    this.staticdataService.getStaticData().subscribe(x => this.staticData = x);
  }

  getUser(){
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.userService.get(currentUser.id).subscribe(
      x => {this.user = x;
            this.updateFormValus(x);
      }
    );
    return currentUser;
  }

  onSubmit(){
  }

  updateFormValus(user: User){
    this.userForm.patchValue({
      firstname: user?.firstName,
      lastname: user?.lastName,
      profilemail: user?.email,
      profilephone: user?.phone,
      password: user?.password,
      gender: 'Female',
      birthdate: '',
      profilePic: [`assets/profile-pic.svg`],
      streetAddress1: user?.addresses[0]?.address1,
      streetAddress2: user?.addresses[0]?.address2,
      inputCity: user?.addresses[0]?.city,
      stateCode: user?.addresses[0]?.stateCd,
      inputPin: user?.addresses[0]?.pinCode,
      national: user?.addresses[0]?.countryCd,
    });
  }

}
