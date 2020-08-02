import { Component, OnInit } from '@angular/core';
import { NotificationMiddlewareService } from 'src/app/core/notification-middleware.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public notificationMiddleware: NotificationMiddlewareService,
              private router: Router) { }

  ngOnInit(): void {
  }

  toggleSubscription() {
    this.notificationMiddleware.toggleSubscription();
  }

  cleanUrl(url) {
    if (url.indexOf(self.location.origin) >= 0) {
      return url.replace(self.location.origin, '');
    }
    return url;
  }

  removeNotif(notif) {
    const index = this.notificationMiddleware.notifications.indexOf(notif);
    if (index >= 0) {
      this.notificationMiddleware.notifications.splice(index, 1);
    }
  }

}
