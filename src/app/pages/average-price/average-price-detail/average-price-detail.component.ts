import { Component, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../common/services/post.service';

@Component({
  selector: 'ngx-average-price-detail',
  templateUrl: './average-price-detail.component.html',
  styleUrls: ['./average-price-detail.component.scss'],
})
export class AveragePriceDetailComponent implements OnInit {
  data: any;
  options: any;

  colors: any;
  chartjs: any;

  districtId: string;
  constructor(
    private theme: NbThemeService,
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.districtId = this.route.snapshot.params.id;
    this.postService.getPostPriceRangeByDistrictId(this.districtId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.data = {
          labels: res.map((el) => el.range),
          datasets: [{
            data: res.map(el => el.count),
            label: 'Average Price',
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primaryLight, 0.8),
          }],
        };
      });
    this.theme.getJsTheme().subscribe(res => {
      this.colors = res.variables;
      this.chartjs = res.variables.chartjs;
    });

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
  }

}
