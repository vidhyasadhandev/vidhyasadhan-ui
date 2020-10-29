import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-promoterlogin',
  templateUrl: './promoterlogin.component.html',
  styleUrls: ['../promoterregister/promoterregister.component.css']
})
export class PromoterloginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authService: AuthserviceService) {
                if (this.authService.userValue) {
                  this.router.navigate(['/vs']);
                }
              }

  loginForm: FormGroup;
  submitted;
  loading;
  success;
  returnUrl: string;
  error;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/vs';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value, 4)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['authenticate'], {queryParams: { returnUrl : this.returnUrl, email: this.f.username.value}});
        },
        error: error => {
          this.error = 'Please Check your Password or Email to Confirm';
          this.loading = false;
        }
      });
  }

  forgotClick(event){

  }

}
