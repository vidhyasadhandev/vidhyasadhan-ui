import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { FileuploaderService } from 'src/app/_services/fileuploader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class StudentAssignmentsComponent implements OnInit {

  assignments;
  courses;
  filter;
  error;
  isUploaded;
  uploadedFile;
  isSuccess;
  selectdetail = false;
  splitAssignments;
  month = new Date();

  constructor(private courseService: CourseService,
              private authService: AuthserviceService,
              private fileUploader: FileuploaderService) { }

  ngOnInit(): void {
    this.filterassignments();
  }

  filterassignments(){
    this.courseService.getStudentAssignments(this.authService.userValue.id)
    .subscribe(x => {this.assignments = x;
                     console.log(this.assignments);
                     this.splitAssignments = x?.filter(y => new Date(y.assignment.dueDate).getMonth() === this.month.getMonth() &&
                     new Date(y.assignment.dueDate).getFullYear() === this.month.getFullYear()); },
      (error) => this.error = error);
  }

  downloadFile(data) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    window.open(data);
  }

  fileBrowse(files){
    this.uploadedFile = files[0];
    this.isUploaded = true;
  }

  onSubmit(assignment){
    assignment.submissionDate = new Date();
    assignment.status = 1;
    if (this.isUploaded){
      const fileToUpload =  this.uploadedFile as File;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.fileUploader.uploadFile(formData).subscribe(x => {
        assignment.submissionFile = x.filepath;
        this.update(assignment);
      });
    }
    else{
      this.update(assignment);
    }
  }

  update(assignment){
    const assignmentToUpdate = {
      assignmentId: assignment.assignmentId,
      status: 1,
      submissionDate: assignment.submissionDate,
      submissionFile: assignment.submissionFile,
      userId: assignment.userId,
    };
    this.courseService.updateStudentAssignments(assignmentToUpdate).subscribe(x => {if (x >= 0){
      this.isSuccess = true;
    }}, (error) => this.isSuccess = false);
  }

  onDelete(){
    this.uploadedFile = null;
  }

  nextClick(side){
    if (side === 'left'){
      this.month = moment(this.month).subtract('1', 'month').toDate() ;
    }
    else{
      this.month = moment(this.month).add('1', 'month').toDate() ;
    }
    this.filterassignments();
  }

}
