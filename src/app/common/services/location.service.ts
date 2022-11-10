import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { District, Province } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private url = environment.serverURL + environment.post + environment.common + environment.location + '?url=';

  constructor(
    private apiService: ApiService,
  ) { }

  getListProvinces(baseUrl: string) {
    return this.apiService.getAPI<Province>(this.url + baseUrl);
  }

  getListDistrictsByProvinceId(baseUrl: string) {
    return this.apiService.getAPI<District>(this.url + baseUrl);
  }
}
