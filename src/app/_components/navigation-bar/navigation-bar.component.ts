import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';
import { StaticdataService } from 'src/app/_services/staticdata.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  user: User;
  checked = false;
  navClicked = true;
  notifications = [];
  smClicked = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public authService: AuthserviceService, private staticService: StaticdataService) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
    if (this.authService.userValue.id){
      this.staticService.getNotifications(this.authService.userValue.id).subscribe(
        x => this.notifications = x
      );
    }
  }

  logout() {
    this.authService.logout();
  }

  menuClicked(){
    this.toggleSidenav.emit();
    this.navClicked = !this.navClicked;
  }

  smallmenuClicked(){
    this.smClicked = !this.smClicked;
  }

}
