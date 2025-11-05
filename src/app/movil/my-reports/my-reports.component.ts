import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';

import {
  IonContent,
  IonButton,
  IonCard,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css'],
  imports: [
    IonContent,
    IonButton,
    IonCard,
    CommonModule,
    RouterLink]

})
export class MyReportsComponent implements OnInit {

  constructor(private reportService: Report) { }
  reports: reports[] = [];
  ngOnInit() {
    this.reportService.reportsfinishedpending().subscribe({
      next: (data: reports[]) => {
        this.reports = data;
        console.log('Reportes obtenidos:', this.reports);
      },
      error: (error) => {
        console.error('Error al obtener los reportes', error);
      }
    });
  }

}
