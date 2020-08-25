import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tutor-referrals-details',
  templateUrl: './tutor-referrals-details.component.html',
  styleUrls: ['./tutor-referrals-details.component.css']
})
export class TutorReferralsDetailsComponent implements OnInit {

  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
