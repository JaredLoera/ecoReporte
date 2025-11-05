import { Component, OnInit, } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { environment } from "src/environments/environment";
import { user } from "src/app/core/interfaces/user";
import {
  IonLabel,
  IonContent,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonItem, 
  IonButtons,
  IonBackButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    IonButtons, 
    IonBackButton,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    CommonModule,
    IonLabel,
    IonHeader,
    IonIcon,
    IonItem
  ]
})
export class ProfileComponent implements OnInit {
  user: user | null = null;

  constructor() { }

  ngOnInit() { 
    const storedUser = localStorage.getItem(environment.storageNames.user);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

}
