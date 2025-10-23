import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonCard,
  IonAvatar,
  IonRouterOutlet,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
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
    IonLabel
  ],

})
export class DashboardComponent implements OnInit {

  constructor(private reportService: Report) { }

  reports: reports[] = [];

  ngOnInit() {
    addIcons({ library, playCircle, radio, search });
   
  }
}
