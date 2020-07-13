import { Component } from '@angular/core';
import { User } from './_models/user';
import { AuthserviceService } from './_services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vidhyasadhan-ui';
  user: User;

  constructor(private authService: AuthserviceService){
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
  }

}
