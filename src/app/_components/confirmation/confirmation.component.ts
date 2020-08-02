import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public authservice: AuthserviceService) { }

  user: {
    userId: '',
    token: ''
  };
  success;
  isResend;

  authUser: User;

  ngOnInit(): void {
    this.authUser = this.authservice.userValue;
    this.route.params.subscribe(
      (params) =>
      {
        this.user = {
          userId: params.userid,
          token: params.token
        };
        this.authservice.confirmEmail(this.user).subscribe(x => this.success = x);
      });
  }

  confirmEmail(){
    this.authservice.reConfirm(this.authUser).subscribe(x => this.isResend = x);
  }

}
