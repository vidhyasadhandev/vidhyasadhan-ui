import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  NotificationsService,
  PushSubscription
} from '../_services/notifications.service';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationMiddlewareService {

  public pushNotificationStatus = {
    isSubscribed: false,
    isSupported: false,
    isInProgress: false
  };

  swRegistration = null;
  public notifications = [];
  snackBarDuration: 10;
  constructor(private notificationService: NotificationsService,
              private swPush: SwPush,
              public swUpdate: SwUpdate,
              private matSnackBar: MatSnackBar) {}


  init() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/assets/sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);
          this.swRegistration = swReg;
          this.checkSubscription();
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
      this.pushNotificationStatus.isSupported = true;
    } else {
      this.pushNotificationStatus.isSupported = false;
    }
  }

  checkSubscription() {
    this.swRegistration.pushManager.getSubscription()
      .then(subscription => {
        console.log(subscription);
        console.log(JSON.stringify(subscription));
        this.pushNotificationStatus.isSubscribed = !(subscription === null);
      });
  }

  subscribe() {
    this.pushNotificationStatus.isInProgress = true;
    const applicationServerKey = this.urlB64ToUint8Array(environment.applicationServerPublicKey);
    this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      })
      .then(subscription => {
        console.log(JSON.parse(JSON.stringify(subscription)));
        this.pushNotificationStatus.isSubscribed = true;
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      })
      .then(() => {
        this.pushNotificationStatus.isInProgress = false;
      });

    navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('pushed');
        this.notifications.push(event.data);
        });
  }

  subscribeUser() {
    this.pushNotificationStatus.isInProgress = true;
    const applicationServerKey = this.urlB64ToUint8Array(environment.applicationServerPublicKey);
    this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      })
      .then(subscription => {
        const subject = JSON.parse(JSON.stringify(subscription));
        this.notificationService.subscribe({
          auth: subject.keys.auth,
          p256Dh: subject.keys.p256dh,
          endPoint: subject.endpoint
        }).subscribe(s => {
          this.pushNotificationStatus.isSubscribed = true;
        });
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      })
      .then(() => {
        this.pushNotificationStatus.isInProgress = false;
      });

    navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('pushed');
        this.notifications.push(event.data);
        });
  }

  unsubscribe() {
    this.pushNotificationStatus.isInProgress = true;
    this.swRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        this.pushNotificationStatus.isSubscribed = false;
        this.pushNotificationStatus.isInProgress = false;
      });
  }

  unsubscribeUser() {
    this.pushNotificationStatus.isInProgress = true;
    let sub;
    this.swRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          sub = JSON.parse(JSON.stringify(subscription));
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        this.notificationService.unsubscribe({
          auth: sub.keys.auth,
          p256Dh: sub.keys.p256dh,
          endPoint: sub.endpoint
        }).subscribe(() => {
          this.pushNotificationStatus.isSubscribed = false;
          this.pushNotificationStatus.isInProgress = false;
        });
      });
  }

  urlB64ToUint8Array(publicKey) {
    const padding = '='.repeat((4 - publicKey.length % 4) % 4);
    const base64 = (publicKey + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  toggleSubscription() {
    if (this.pushNotificationStatus.isSubscribed) {
     // this.unsubscribeUser();
     this.unsubscribeNotifications();
    } else {
     // this.subscribeUser();
     this.subscribeToNotifications();
    }
  }

  initialize(){
    if (this.swUpdate.isEnabled) {
      this.pushNotificationStatus.isSupported = true;
      this.swUpdate.available.subscribe(() => {
          if (confirm(`New version available. Load New Version?`)) {
              window.location.reload();
          }
      });
    }

    if (this.swPush.isEnabled){
      this.pushNotificationStatus.isSupported = true;
    }

    console.log(this.swUpdate.isEnabled);
    console.log(this.pushNotificationStatus.isSupported);
    this.pushNotificationStatus.isSubscribed = !(this.swPush.subscription === null);
  }

  subscribeToNotifications() {
    this.pushNotificationStatus.isInProgress = true;
    this.swPush.requestSubscription({
        serverPublicKey: environment.applicationServerPublicKey
    })
    .then(sub => {
      const subject = JSON.parse(JSON.stringify(sub));
      this.notificationService.subscribe({
        auth: subject.keys.auth,
        p256Dh: subject.keys.p256dh,
        endPoint: subject.endpoint
      }).subscribe(s => {
        this.pushNotificationStatus.isSubscribed = true;
        const snackBarRef = this.matSnackBar.open('Now you are subscribed', null, {
          duration: this.snackBarDuration
        });
      });
    }).catch(err => console.error('Could not subscribe to notifications', err))
    .then(() => {
      this.pushNotificationStatus.isInProgress = false;
    });
  }

  unsubscribeNotifications(){
    this.pushNotificationStatus.isInProgress = true;
    const sub = JSON.parse(JSON.stringify(this.swPush.subscription));
    console.log('test');
    this.swPush.unsubscribe();
    this.notificationService.unsubscribe({
      auth: sub.keys.auth,
      p256Dh: sub.keys.p256Dh,
      endPoint: sub.endpoint
    }).subscribe(() => {
      this.pushNotificationStatus.isSubscribed = false;
      this.pushNotificationStatus.isInProgress = false;
    });
  }
}
