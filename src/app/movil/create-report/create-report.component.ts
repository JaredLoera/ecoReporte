import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonAvatar,
  IonRouterOutlet,
  IonLabel,
      IonSelect,
      IonSelectOption,
      IonItem,
      IonTextarea,
      IonButtons,
      IonBackButton
} from '@ionic/angular/standalone';
import { Report } from 'src/app/core/services/report/report';
import { reportType } from 'src/app/core/interfaces/reportType';
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css'],
    imports: [
       IonContent,
      IonHeader,

      IonTitle,
      IonToolbar,
      IonButton,

      IonLabel,
      CommonModule,
      IonSelect,
      IonSelectOption,
      IonItem,
      IonTextarea,
      IonButtons,
      IonBackButton
    ]
})
export class CreateReportComponent  implements OnInit {

  constructor(private reportService: Report) { }
  reportTypes: reportType[] = [];

  ngOnInit() {
    this.reportService.getReportsTypes().subscribe(types => {
      this.reportTypes = types;
    });
  }

}
