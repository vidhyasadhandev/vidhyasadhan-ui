import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private authService: AuthserviceService,
              private route: ActivatedRoute,
              private router: Router, ) { }

  phone: number;
  returnUrl;
  useremail;
  otpcode = [
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null}
  ];

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.useremail = this.route.snapshot.queryParams['email'];
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  entervalue(event){
    const element = event.srcElement.nextElementSibling;
    if (element == null) {
        return;
    }
    else {
        element.focus();
    }
  }

  onSubmit(){
    let finalcode = '';
    this.otpcode.forEach(x => {finalcode += x.value; } );
    console.log(finalcode);
    this.authService.verifyotp(this.useremail, finalcode).subscribe(
      x => {
        if (x){
          this.router.navigate([this.returnUrl]);
        }
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.router.navigate([this.returnUrl]);
      }
    );
  }

}
