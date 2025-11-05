import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';
import { User } from 'src/app/core/services/user/user';
import {user} from 'src/app/core/interfaces/user';
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel, 
  IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [IonIcon, 
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel
  ],

})
export class DashboardComponent implements OnInit {

  constructor(private userService: User) { }

  reports: reports[] = [];
 

  ngOnInit() {
    addIcons({ library, playCircle, radio, search });
  }
}
