import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbInputModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavigatorComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    DashboardRoutingModule,
    NbThemeModule,
    NbInputModule,
    NbLayoutModule,
  ],
})
export class DashboardModule { }
