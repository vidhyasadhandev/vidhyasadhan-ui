import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventmodel',
  templateUrl: './eventmodel.component.html',
  styleUrls: ['./eventmodel.component.css']
})
export class EventmodelComponent implements OnInit {

  submitted;
  calendarformForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EventmodelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    this.calendarformForm = this.formBuilder.group({
      summary: [this.data.event.title, Validators.required],
      location: [this.data.event?.meta?.location, Validators.required],
      description: ['', Validators.required],
      timeZone: ['Asia/Calcutta', Validators.required],
      start: [this.data.event.start, Validators.required],
      end: [this.data.event.end, Validators.required],
      recurrence: ['', Validators.required],
      attendees: ['', Validators.required],
      organizer: [''],
      count: ['']
    });
    this.calendarformForm.disable();
  }

  get f() {
    return this.calendarformForm.controls;
  }

  onSubmit(){
    this.dialogRef.close(this.f);
  }

  onNoClick(){
  }

}
