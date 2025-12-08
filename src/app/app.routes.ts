import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './movil/dashboard/dashboard.component';
import { ActualReportComponent } from './movil/actual-report/actual-report.component';
import { CreateReportComponent } from './movil/create-report/create-report.component';
import { MyReportsComponent } from './movil/my-reports/my-reports.component';
import { ProfileComponent } from './movil/profile/profile.component';
import { deviceGuard } from './core/guards/device/device-guard';
import { NotAllowedDivaceComponent } from './errors/not-allowed-divace/not-allowed-divace.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'not-allowed-device',
    component: NotAllowedDivaceComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [deviceGuard],
    children: [
      {
        path: 'home',
        component: ActualReportComponent,
      },
      {
        path: 'create',
        component: CreateReportComponent
      },
      {
        path: 'my-reports',
        component: MyReportsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
  
];
