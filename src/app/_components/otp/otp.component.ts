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
  error;
  tokenMessage;
  otpcode = [
    {name: 'key1', value: null},
    {name: 'key2', value: null},
    {name: 'key3', value: null},
    {name: 'key4', value: null},
    {name: 'key5', value: null},
    {name: 'key6', value: null},
  ];

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.useremail = this.route.snapshot.queryParams['email'];
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  entervalue(event){
    const el = event.srcElement;
    const tidx = +(el.getAttribute('tabindex')) + 1,
    elements = document.getElementsByTagName('input');

    for (let i = elements.length; i--;) {
        const tidx2 = elements[i].getAttribute('tabindex');
        if (Number(tidx2) === tidx) { elements[i].focus(); }
    }
    // // const element1 = document.getElementsByName(event.srcElement.name) as HTMLInputElement;
    // if (element == null) {
    //     return;
    // }
    // else {
    //     element.focus();
    // }
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
        else{
          this.error = 'Invalid token code';
        }
      },
      (error) => {
        this.error = 'Invalid token code';
      }
    );
  }

  resendcode(){
    this.authService.resendotp(this.authService.userValue.email).subscribe(x => {
      if (x){
          this.tokenMessage = 'Resent Code Succesfully';
      }
    }, (error) => {
      this.error = error;
    });
  }

}
