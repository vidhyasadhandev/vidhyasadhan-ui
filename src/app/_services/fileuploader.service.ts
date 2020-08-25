import { Injectable, Input } from '@angular/core';
// import { BlobServiceClient, AnonymousCredential, newPipeline} from '@azure/storage-blob';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploaderService {

  constructor(private http: HttpClient) { }

  uploadFile(file){
    const header = new HttpHeaders();
    header.set('Accept', 'application/json');
    header.delete('Content-Type');
    return this.http.put<any>(`${environment.apiUrl}/files/upload`, file, {headers: header});
  }

  downloadFile(filename){
    return this.http.get<any>(`${environment.apiUrl}/files/DownloadFile/` + filename);
  }

  listFiles(){
    return this.http.get<any>(`${environment.apiUrl}/files/listfiles`);
  }
}
