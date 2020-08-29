import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profilemodel',
  templateUrl: './profilemodel.component.html',
  styleUrls: ['./profilemodel.component.css']
})
export class ProfilemodelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfilemodelComponent>) { }

  files: any[] = [];
  imagepath;

  ngOnInit(): void {
  }

  public dropped(files) {
    this.prepareFilesList(files);
  }

  public fileBrowse(files){
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagepath = e.target.result;
    };
    reader.readAsDataURL(files[0]);
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onUpload(file){
      this.dialogRef.close({file: this.files, image: this.imagepath});
  }

  onCancel(){
    this.dialogRef.close();
  }

}
