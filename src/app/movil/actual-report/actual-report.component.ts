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
  IonButtons, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-actual-report',
  templateUrl: './actual-report.component.html',
  styleUrls: ['./actual-report.component.css'],
  imports: [IonLabel, IonIcon, IonTabButton,   IonButtons, 
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
 requestPermission(): void {
    console.log('Solicitando permiso para notificaciones...');
    try {
      // 1. Verificar si la API es soportada (opcional pero buena práctica)
      if (!('Notification' in window)) {
        console.error('Este navegador no soporta notificaciones de escritorio.');
        return;
      }
      // 2. Solicitar el permiso
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones concedido.');
          // Aquí puedes llamar a tu función para crear la notificación inicial
        } else {
          console.log('Permiso para notificaciones denegado:', permission);
        }
      });
    } catch (error) {
      // Captura si hay errores de seguridad (a veces el navegador tira un error en lugar de un 'denied')
      console.error('Error al solicitar permiso:', error);
    }
  }
}
