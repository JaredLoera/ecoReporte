import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './movil/dashboard/dashboard.component';
import { ActualReportComponent } from './movil/actual-report/actual-report.component';
import { CreateReportComponent } from './movil/create-report/create-report.component';
import { MyReportsComponent } from './movil/my-reports/my-reports.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
  
];
