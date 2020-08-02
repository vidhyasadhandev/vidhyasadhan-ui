import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { IsMatch } from 'src/app/_helpers/fieldmatcher';
import { User } from 'src/app/_models/user';
import { handleException } from 'src/app/_helpers/vsexception';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isAlert = '';
  error = '';

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthserviceService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: [''],
      confirmPassword: [''],
      // uname: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: IsMatch('password', 'confirmPassword') });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
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
       role: this.authService.userType === 'pink' ? 0 : 1,
    };

    this.userService.addUser(regUser)
    .subscribe(data => {
      if (data){
        localStorage.setItem('user', JSON.stringify(regUser));
        this.router.navigate(['/verifyemail']);
      }else{
        this.error = `Unable to Complete Registration`;
      }
     }, error => this.error = error);

  }

}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
