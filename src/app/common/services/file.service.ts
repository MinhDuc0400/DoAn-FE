import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CloudBinaryResponse } from '../interfaces/cloudinary';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  constructor(
    private apiService: ApiService,
  ) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinaryUploadPreset);
    // return this.apiService.postAPI<CloudBinaryResponse, FormData>(environment.cloudinaryURL, formData);
    return this.apiService.postAPI<CloudBinaryResponse, FormData>
    (environment.cloudinaryURL, formData);
  }
}
