import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TutorReferralsDetailsComponent } from './tutor-referrals-details/tutor-referrals-details.component';

@Component({
  selector: 'app-tutor-referrals',
  templateUrl: './tutor-referrals.component.html',
  styleUrls: ['./tutor-referrals.component.css']
})
export class TutorReferralsComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(TutorReferralsDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

}
