import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {

  broadcastForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {

    this.broadcastForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  broadcast(){
    console.log(this.broadcastForm.get('url').value);
    this.notificationService.broadcast({
      url: this.broadcastForm.get('url').value,
      message: this.broadcastForm.get('message').value,
      title: this.broadcastForm.get('title').value,
    }).subscribe(() => {
      this.broadcastForm.reset();
    });
  }
}
