import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../common/services/post.service';

@Component({
  selector: 'explore-detail',
  templateUrl: './explore-detail.component.html',
  styleUrls: ['./explore-detail.component.scss']
})
export class ExploreDetailComponent implements OnInit {
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
        this.data = {
          labels: res.map((el, idx) => {
            if (idx !== res.length - 1) {
              return el.range + 'M' + '-' + res[idx + 1].range + 'M';

            }
            return el.range + 'M' + '+';
          }),
          datasets: [{
            data: res.map(el => el.count),
            label: 'Frequency',
            backgroundColor: '#1876F2',
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
