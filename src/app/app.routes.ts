import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './movil/dashboard/dashboard.component';
import { ActualReportComponent } from './movil/actual-report/actual-report.component';
import { CreateReportComponent } from './movil/create-report/create-report.component';
import { MyReportsComponent } from './movil/my-reports/my-reports.component';
import { ProfileComponent } from './movil/profile/profile.component';
import { deviceGuard } from './core/guards/device/device-guard';
import { NotAllowedDivaceComponent } from './errors/not-allowed-divace/not-allowed-divace.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  // Ruta para la verificación de código con correo en url
  {
    path: 'verify-code/:email',
    component: VerifyCodeComponent
  },
  {
    path: 'not-allowed-device',
    component: NotAllowedDivaceComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard]
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
