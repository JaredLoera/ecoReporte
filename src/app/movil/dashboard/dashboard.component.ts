import { Component, OnInit } from '@angular/core';
import { reports } from 'src/app/core/interfaces/reports';
import { User } from 'src/app/core/services/user/user';
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
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
