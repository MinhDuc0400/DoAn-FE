import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../common/services/location.service';
import { ResultDistrict, ResultProvince } from '../../common/interfaces/location';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../../common/services/post.service';

@Component({
  selector: 'ngx-average-price',
  templateUrl: './average-price.component.html',
  styleUrls: ['./average-price.component.scss'],
})
export class AveragePriceComponent implements OnInit {
  filterForm: FormGroup;
  provinceArray: ResultProvince[] = [];
  districtArray: ResultDistrict[] = [];
  data: any;
  options: any;

  colors: any;
  chartjs: any;
  constructor(
    private locationService: LocationService,
    private postService: PostService,
    private theme: NbThemeService,
  ) { }

  ngOnInit(): void {
    this.theme.getJsTheme().subscribe(res => {
       this.colors = res.variables;
       this.chartjs = res.variables.chartjs;
    });

    this.locationService.getListProvinces('https://vapi.vnappmob.com/api/province').subscribe(res => {
      this.provinceArray = res.results;
    });

    this.filterForm = new FormGroup({
      provinceId: new FormControl(''),
      districtId: new FormControl(''),
    });

    this.provinceId.valueChanges
      .pipe(switchMap(id => this.postService.getAveragePriceInProvince(id + '')))
      .subscribe(res => {
        const provinceIds = Object.keys(res);
        this.data = {
          labels: provinceIds.map(el => res[el].districtName),
          datasets: [{
            data: provinceIds.map(el => res[el].price),
          }],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: this.chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: this.chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: this.chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: this.chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: this.chartjs.textColor,
                },
              },
            ],
          },
        };
      });
  }

  get provinceId() {
    return this.filterForm.get('provinceId');
  }

}
