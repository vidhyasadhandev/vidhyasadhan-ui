import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  UserService
} from 'src/app/_services/user.service';
import {
  User
} from 'src/app/_models/user';
import {
  StaticdataService
} from 'src/app/_services/staticdata.service';
import {
  StaticData
} from 'src/app/_models/static';
import {
  WeekDay, formatDate
} from '@angular/common';
import { Profile } from 'src/app/_models/profile';
import { HttpEventType } from '@angular/common/http';
import { FileuploaderService } from 'src/app/_services/fileuploader.service';
import { read } from 'fs';
import { EventEmitter } from 'protractor';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { format } from 'date-fns/fp';
import { MatDialog } from '@angular/material/dialog';
import { ProfilemodelComponent } from '../profilemodel/profilemodel.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  profile: Profile;
  staticData: StaticData;
  public submitted = false;
  proof;
  successmessage = false;
  proofdocument;
  uploadedFile;
  levels;

  days = [
    {day: 'Monday', selected: false },
    {day: 'Tuesday', selected: false },
    {day: 'Wednesday', selected: false },
    {day: 'Thursday', selected: false },
    {day: 'Friday', selected: false },
    {day: 'Saturday', selected: false },
    {day: 'Sunday', selected: false }
  ];
  allChecked = false;

  qualifications = [
    {id: 1, value: 'No High School' },
    {id: 2, value: 'Some High School' },
    {id: 3, value: 'High School Diploma or GED' },
    {id: 4, value: 'Associate Degree' },
    {id: 5, value: 'Bachelors' },
    {id: 6, value: 'Masters' },
    {id: 7, value: 'Post Grad' },
    {id: 8, value: 'Doctorate' },
    {id: 9, value: 'Professional Degree' },
    {id: 9, value: 'Professional Certificate' },
  ];

  nacategories = [
    {id: 0, value: 'Music', subcategories: [
      {id: 0, value: 'Classical Music' },
      {id: 1, value: 'Tabla' },
      {id: 2, value: 'Piano' },
    ]},
    {id: 1, value: 'Cricket', subcategories: [
      {id: 0, value: 'Batsmen' },
      {id: 1, value: 'Bowler' },
      {id: 2, value: 'Wicket keeper' },
    ]},
    {id: 2, value: 'Tennis', subcategories: [
      {id: 0, value: 'Batsmen' },
      {id: 1, value: 'Bowler' },
      {id: 2, value: 'Wicket keeper' },
    ] },
  ];

  nasubcategories = [
    {id: 1, value: 'Music' },
    {id: 2, value: 'Cricket' },
    {id: 3, value: 'Tennis' },
  ];

  agegroups = [
    {id: 1, value: '5 to 10' },
    {id: 2, value: '11 to 19' },
    {id: 3, value: '20 to 35' }
  ];

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  files  = [];


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private staticdataService: StaticdataService,
              private fileUploader: FileuploaderService,
              public authService: AuthserviceService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: [{
        value: '',
        disabled: true
      }, Validators.required],
      lastname: [{
        value: '',
        disabled: true
      }, Validators.required],
      profilemail: [{
        value: '',
        disabled: true
      }, Validators.required],
      profilephone: [{
        value: '',
        disabled: true
      }, Validators.required],
      password: [{
        value: '',
        disabled: true
      }, Validators.required],
      gender: [{
        value: '',
        disabled: false
      }, Validators.required],
      birthdate: [{
        value: '',
        disabled: false
      }, Validators.required],
      profilePic: [`assets/profile-pic.svg`],
      streetAddress1: ['', Validators.required],
      streetAddress2: [''],
      inputCity: ['', Validators.required],
      stateCode: ['', Validators.required],
      inputPin: ['', Validators.required],
      national: ['', Validators.required],
      backgroundtype: ['', Validators.required],
      medium: ['', Validators.required],
      subject: ['', Validators.required],
      board: [''],
      standard: [''],
      qualification: [''],
      isteacher: [''],
      tutorexp: [''],
      tutorpreference: [''],
      dayselection: [''],
      distance: [''],
      timing: [''],
      rate: [''],
      currency: [''],
      proof: [''],
      proofDoc: [''],
      demo: [''],
      interests: [''],
      nacategory: [''],
      nasubcategory: [''],
      agegroup: [''],
      certification: [''],
    });
    this.getUser();
    this.staticdataService.getStaticDataSets()
    .subscribe(x => {this.staticData = x;
                     this.levels = this.staticData.subjects
                     .filter((thing, i, arr) => arr.findIndex(t => t.level === thing.level) === i); });
  }

  getUser() {
    const currentUser: User = this.authService.userValue;
    this.userService.get(currentUser.id).subscribe(
      x => {
        this.user = x;
        console.log(this.user);
        this.updateFormValus(x);
      }
    );
    return currentUser;
  }

  get f() { return this.userForm.controls; }

 fileread(callback) {
    const file = this.f.proofDoc.value;
    const reader = new FileReader();

    reader.onload = (() => {
      callback(reader.result);
    });

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      const userValues: Profile = {
        firstName: this.f.firstname.value,
        lastName: this.f.lastname.value,
        email: this.f.profilemail.value,
        phone: this.f.profilephone.value,
        gender: this.f.gender.value,
        birthdate: this.f.birthdate.value,
        profilePic: this.f.profilePic.value,
        ageGroup: this.f.agegroup.value,
        certification: this.f.certification.value,
        naCategory: this.f.nacategory.value,
        naSubCategory: this.f.nasubcategory.value,
        address: {
          addressType: 1,
          addressId: this.profile?.address.addressId,
          address1: this.f.streetAddress1.value,
          address2: this.f.streetAddress2.value,
          city: this.f.inputCity.value,
          pinCode: this.f.inputPin.value,
          stateCd: this.f.stateCode.value,
          countryCd: this.f.national.value
        },
        instructor: {
          userId: this.profile?.instructor?.userId,
          board: this.f.board.value,
          academyTypeId: this.f.backgroundtype.value,
          highestEducation: this.f.qualification.value,
          subjects: this.f.subject.value,
          level: this.f.standard.value,
          isTutorBefore: this.f.isteacher.value,
          professionalDescription: this.f.tutorexp.value,
          preference: this.f.tutorpreference.value,
          availableDays: this.days.filter(x => x.selected === true).map(x => x.day).join(','),
          preferredDistance: this.f.distance.value,
          preferredTimeSlot: this.f.timing.value,
          hourlyRate: this.f.rate.value,
          currency: this.f.currency.value,
          idType: this.f.proof.value,
          idDoc: this.f.proofDoc.value,
          demoLink: this.f.demo.value,
          intersets: this.f.interests.value,
          medium: this.f.medium.value,
        },
        student: {
          userId:  this.authService.userValue.id,
          board:  this.f.board.value,
          academyTypeId:  this.f.backgroundtype.value,
          subjects:  this.f.subject.value,
          level:  this.f.standard.value,
          intersets:  this.f.interests.value,
          medium: this.f.medium.value,
        }
      };

      if (this.authService.userValue.role === 0){
        userValues.instructor = null;
      }
      else if (this.authService.userValue.role === 1){
        userValues.student = null;
      }
      this.userService.updateProfileData(userValues)
      .subscribe(x => console.log(x), (error) => console.log(error));
    }
  }

getByteArray(file){

 }

updateFormValus(user: User){
    this.userService.getProfileData(user.id).subscribe(x => {
      this.profile = x;
      const available = this.profile.instructor?.availableDays?.split(',');
      this.days.forEach(a => {
        if (available?.some(y => y === a.day)){
          a.selected = true;
        }
      });
      this.userForm.patchValue({
        firstname: x?.firstName,
        lastname: x?.lastName,
        profilemail: x?.email,
        profilephone: x?.phone,
        password: null,
        gender: x?.gender,
        birthdate: formatDate(x?.birthdate, 'yyyy-MM-dd', 'en-us'),
        profilePic: x?.profilePic === null ? [`assets/profile-pic.svg`] : x?.profilePic,
        streetAddress1: x?.address.address1,
        streetAddress2: x?.address.address2,
        inputCity: x?.address.city,
        stateCode: x?.address.stateCd,
        inputPin: x?.address.pinCode,
        national: x?.address.countryCd,
        backgroundtype: x?.instructor?.academyTypeId?.toString() || x?.student?.academyTypeId?.toString(),
        medium: x?.instructor?.medium || x?.student?.medium,
        subject: x?.instructor?.subjects || x?.student?.subjects,
        board: x?.instructor?.board || x?.student?.board,
        standard: x?.instructor?.level || x?.student?.level,
        qualification: x?.instructor?.highestEducation,
        isteacher: (String)(x?.instructor?.isTutorBefore),
        tutorexp: x?.instructor?.professionalDescription,
        tutorpreference: x?.instructor?.preference,
        dayselection: x?.instructor?.availableDays,
        distance: x?.instructor?.preferredDistance,
        timing: x?.instructor?.preferredTimeSlot,
        rate: x?.instructor?.hourlyRate,
        currency: x?.instructor?.currency,
        proof: x?.instructor?.idType,
        demo: x?.instructor?.demoLink,
        interests: x?.instructor?.intersets || x?.student?.intersets,
        agegroup: x?.ageGroup,
        certification: x?.certification,
        nacategory: x?.naCategory,
        nasubcategory: x?.naSubCategory,
      });
    });
  }

callUploadService(file){
  }

  uploadFile(files, type) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    const filepath = this.fileUploader.uploadFile(formData)
      .subscribe(event => {
        if (type === 0){
          this.uploadedFile = event.filepath;
          this.userForm.get('profilePic').setValue(this.uploadedFile);
        }
        else{
          this.proofdocument = event.filepath;
          this.userForm.get('proofDoc').setValue(this.proofdocument);
        }
      });
  }

onClick(){
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
    };
    fileInput.click();
  }

changeDays(checker, day){
    day.selected = checker;
    this.allChecked = this.days.filter(t => t.selected).length > 0 ? false : this.allChecked;
  }

changeAll(completed: boolean){
    this.allChecked = completed;
    if (this.days == null) {
      return;
    }
    this.days.forEach(t => {
      if (completed === true){
        t.selected = true;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfilemodelComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined){
        console.log(result.image);
        this.userForm.get('profilePic').setValue(result.image);
        this.uploadFile(result.file, 0);
      }
    });
  }

  getSubCategory() {
    return this.nacategories.filter(x => x.value === this.userForm.get('nacategory').value)[0]?.subcategories ;
  }

  reset(){
    this.getUser();
  }
}
