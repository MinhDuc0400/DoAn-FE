export interface ResultProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface ResultDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  lat?: any;
  lng?: any;
  province_id: string;
}

export interface District {
  results: ResultDistrict[];
}

export interface Province {
  results: ResultProvince[];
}
