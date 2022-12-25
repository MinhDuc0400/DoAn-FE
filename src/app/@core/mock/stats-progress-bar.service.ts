import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Today’s Profit',
      value: 1572900,
      activeProgress: 70,
      description: 'Better than last week (70%)',
    },
    {
      title: 'New Posts',
      value: 3,
      activeProgress: 30,
      description: 'Lower than last week (30%)',
    },
    {
      title: 'New Interests',
      value: 15,
      activeProgress: 40,
      description: 'Better than last week (40%)',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
