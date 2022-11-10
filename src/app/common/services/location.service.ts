import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { District, Province } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private url = environment.addressURL;

  constructor(
    private apiService: ApiService,
  ) { }

  getListProvinces() {
    this.apiService.getAPI<Province>(this.url + '/province');
  }

  getListDistrictsByProvinceId(provinceId: string) {
    this.apiService.getAPI<District>(this.url + '/province/district/' + provinceId);
  }
}
