import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customvalidators } from 'src/app/_helpers/customvalidators';
import { IsMatch } from 'src/app/_helpers/fieldmatcher';
import { User } from 'src/app/_models/user';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-promoterregister',
  templateUrl: './promoterregister.component.html',
  styleUrls: ['./promoterregister.component.css']
})
export class PromoterregisterComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private alertService: AlertService) { }

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isAlert = '';
  error = '';
  success;
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [ null, Validators.compose([
        Validators.required,
        Customvalidators.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { isInvalid: true }),
        Validators.minLength(8)])
     ],
      role: [''],
      confirmPassword: [''],
    }, {validator: IsMatch('password', 'confirmPassword') });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.error = null;
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }

    const regUser: User = {
       firstName : this.f.firstName.value,
       lastName: this.f.lastName.value,
       email: this.f.email.value,
       password: this.f.password.value,
       phone: this.f.phone.value,
       username: this.f.email.value,
       role: 4,
    };

    this.userService.addUser(regUser)
    .subscribe(data => {
      if (data === true){
        this.alertService.success('Registration Complete. Check your email to confirm!', this.options);
      }else{
        this.alertService.error('Unable to Complete Registration', this.options);
      }
     }, error => this.alertService.error(error, this.options));

  }

  registered(){
    this.success = null;
    this.registerForm.reset();
  }

}
