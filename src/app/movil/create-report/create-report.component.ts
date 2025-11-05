import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { user } from 'src/app/core/interfaces/user';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
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
import { responseMessage } from 'src/app/core/interfaces/responseMessage';
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
    IonBackButton,
    ReactiveFormsModule
  ]
})
export class CreateReportComponent implements OnInit {

  constructor(private reportService: Report) {

  }
  reportTypes: reportType[] = [];
  user: user | null = null;

  ngOnInit() {
    this.reportService.getReportsTypes().subscribe(types => {
      this.reportTypes = types;
    });
    const storedUser = localStorage.getItem(environment.storageNames.user);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }


  createReportForm = new FormGroup({
    description: new FormControl(''),
    report_type_id: new FormControl(''),
  });

  async createReport() {
    if(!this.user){
      console.error('Usuario no disponible');
      return;
    }
    const formData = this.createReportForm.value;
    const reportData = {
      user_id: this.user.id,
      report_type_id: parseInt(formData.report_type_id!),
      report_status_id: 1, // Asignar estado inicial
      description: formData.description,
      latitude: '25.564978744932137', // Obtener latitud real
      longitude: '-103.28239736897521' // Obtener longitud real
    };
    const reportFormData = new FormData();
    reportFormData.append('json', JSON.stringify(reportData));
    this.reportService.createReport(reportFormData).subscribe({
      next: (response: responseMessage) => {
        console.log('Reporte creado exitosamente:', response);
      },
      error: (error) => {
        console.error('Error al crear el reporte:', error);
      }
    });
  }
}
