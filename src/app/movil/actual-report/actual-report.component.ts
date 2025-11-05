import { Component, OnInit } from '@angular/core';
import { reports } from 'src/app/core/interfaces/reports';
import { Report } from 'src/app/core/services/report/report';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-actual-report',
  templateUrl: './actual-report.component.html',
  styleUrls: ['./actual-report.component.css'],
  imports: [  IonButtons, 
     IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    CommonModule,
    RouterLink,
    IonButton,
    IonButton,
     IonBackButton
  ]
})
export class ActualReportComponent  implements OnInit {

  constructor(private reportService: Report) { }

  reports: reports[] = [];

  ngOnInit() {
     this.reportService.getMyReports().subscribe({
      next: (data: reports[]) => {
        this.reports = data;
      },
      error: (error) => {
        console.error('Error fetching reports', error);
      }
    });
  }

  logOut() {
    console.log('Logging out...');
  }
}
