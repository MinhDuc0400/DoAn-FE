import { Component, OnInit, ViewChild } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../common/services/location.service';
import { ResultDistrict, ResultProvince } from '../../common/interfaces/location';
import { switchMap, tap } from 'rxjs/operators';
import { PostService } from '../../common/services/post.service';
import { ChartComponent } from 'angular2-chartjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-average-price',
  templateUrl: './average-price.component.html',
  styleUrls: ['./average-price.component.scss'],
})
export class AveragePriceComponent implements OnInit {
  @ViewChild('someInput') someInput!: ChartComponent;
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
    private router: Router,
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
      .pipe(
        tap(id => {
          this.locationService.getListDistrictsByProvinceId('https://vapi.vnappmob.com/api/province/district/' + id)
            .subscribe(res => {
              if (res) {
                this.districtArray = res.results;
              }
            });
        }),
        switchMap(id => this.postService.getAveragePriceInProvince(id + '')),
      )
      .subscribe(res => {
        const provinceIds = Object.keys(res);
        this.data = {
          labels: provinceIds.map(el => res[el].districtName),
          datasets: [{
            data: provinceIds.map(el => res[el].price),
            label: 'Average Price',
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primaryLight, 0.8),
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


  selectElement(event) {
    this.router.navigate(['pages/price-average/' + this.findDistrictIdByDistrictName(event[0]?._model?.label)]);
  }

  findDistrictIdByDistrictName(name: string): string {
    return this.districtArray.find(el => el.district_name === name).district_id;
  }

  get provinceId() {
    return this.filterForm.get('provinceId');
  }

}
