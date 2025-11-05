import { Component, OnInit } from '@angular/core';
import { IonHeader , IonToolbar, IonTitle, IonContent, IonIcon , IonButton } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-not-allowed-divace',
  templateUrl: './not-allowed-divace.component.html',
  styleUrls: ['./not-allowed-divace.component.css'],
  imports: [IonTitle, IonHeader, IonToolbar, IonContent, IonIcon,IonButton,RouterLink]
})
export class NotAllowedDivaceComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
