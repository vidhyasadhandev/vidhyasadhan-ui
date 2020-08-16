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

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  files  = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private staticdataService: StaticdataService,
              private fileUploader: FileuploaderService,
              public authService: AuthserviceService) {}

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
      proofDoc: [null],
      demo: [''],
      interests: [''],
    });
    this.getUser();
    this.staticdataService.getStaticData().subscribe(x => this.staticData = x);
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
        profilePic: null,
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
          idDoc: '',
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

      if (this.f.proofDoc.value?.length > 0){
        const data = this.fileread((e) => {
          console.log(e);
          userValues.instructor.idDoc = '';
        });
      }

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
        backgroundtype: (String)(x?.instructor?.academyTypeId) || (String)(x?.student?.academyTypeId),
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
        proofDoc: x?.instructor?.idDoc,
        demo: x?.instructor?.demoLink,
        interests: x?.instructor?.intersets || x?.student?.intersets,
      });
    });
  }

callUploadService(file){
    // const formData = new FormData();
    // formData.append('file', file.data);
    // file.inProgress = true;
    // this.fileUploader.upload(formData).pipe(
    //   map(event => {
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         file.progress = Math.round(event.loaded * 100 / event.total);
    //         break;
    //       case HttpEventType.Response:
    //         return event;
    //     }
    //   }).subscribe((event: any) => {
    //     if (typeof (event) === 'object') {
    //       console.log(event.body);
    //     }
    //   });
  }

upload() {
    // this.fileInput.nativeElement.value = '';
    // this.files.forEach(file => {
    //   this.callUploadService(file);
    // });
  }

onClick(){
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
        // for (let index = 0; index < fileInput .files.length; index++)
        // {
        //      const file = fileInput .files[index];
        //      this.files.push({ data: file, inProgress: false, progress: 0});
        // }
        this.upload();
    };
    fileInput.click();
  }

changeDays(checker, day){
    day.selected = checker;
    this.allChecked = this.days.filter(t => t.selected).length > 0 ? false : this.allChecked;
  }

changeAll(completed: boolean) {
    this.allChecked = completed;
    if (this.days == null) {
      return;
    }
    this.days.forEach(t => {
      if (completed === true){
        t.selected = false;
      }
    });
  }
}
