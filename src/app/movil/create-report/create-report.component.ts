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
  IonBackButton,
  IonList, // Agrega este si no está para el diseño de lista
  IonThumbnail, // Para mostrar miniaturas de imágenes
  IonImg, // Para mostrar imágenes
  IonIcon // Para el icono de la cámara
} from '@ionic/angular/standalone';
import { Report } from 'src/app/core/services/report/report';
import { reportType } from 'src/app/core/interfaces/reportType';
import { responseMessage } from 'src/app/core/interfaces/responseMessage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { addIcons } from 'ionicons'; // Para agregar iconos
import { cameraOutline } from 'ionicons/icons'; // Importar el icono de la cámara
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
    ReactiveFormsModule,
    IonImg,
    IonIcon
  ]
})
export class CreateReportComponent implements OnInit {

  constructor(private reportService: Report) {
    addIcons({ cameraOutline });
  }

  reportTypes: reportType[] = [];
  user: user | null = null;


  photos: Photo[] = [];



  currentLatitude: number | null = null;
  currentLongitude: number | null = null;


  createReportForm = new FormGroup({
    description: new FormControl(''),
    report_type_id: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  ngOnInit() {
    this.reportService.getReportsTypes().subscribe(types => {
      this.reportTypes = types;
    });
    const storedUser = localStorage.getItem(environment.storageNames.user);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.getCurrentLocation();
  }


  async takePicture() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90, // Calidad de la imagen (0-100)
        allowEditing: false, // Permitir edición (recorte)
        resultType: CameraResultType.Uri, // Retorna una URI (URL para mostrar la imagen)
        source: CameraSource.Camera, // Usar la cámara (también puede ser 'Photos' para galería)
        saveToGallery: false // No guardar en la galería automáticamente
      });

      if (photo) {
        this.photos.push(photo);
        console.log('Foto tomada:', photo);
      }

    } catch (error) {
      console.error('Error al tomar la foto:', error);
      // Puedes mostrar un toast o alert al usuario aquí
    }
  }

  usePhotoGallery() {
    const addNewToGallery = async () => {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
      });
    };

    return {
      addNewToGallery,
    };
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      // Solicita la posición actual
      navigator.geolocation.getCurrentPosition(
        // Éxito: Cuando la ubicación es obtenida
        (position) => {
          this.currentLatitude = position.coords.latitude;
          this.currentLongitude = position.coords.longitude;
          console.log('Ubicación obtenida:', this.currentLatitude, this.currentLongitude);
        },
        // Error: Cuando hay un problema (ej. el usuario deniega el permiso)
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          // Opcional: Asignar valores por defecto o mostrar un mensaje al usuario
        },
        // Opciones (Opcional)
        {
          enableHighAccuracy: true, // Solicita la mejor precisión posible
          timeout: 10000,           // Aumentado a 10 segundos (10000 ms)          maximumAge: 0            // No usar una posición almacenada en caché
          maximumAge: 0
        }
      );
    } else {
      console.error('El navegador no soporta la API de Geolocation.');
    }
  }

  async createReport() {
    if (!this.user) {
      console.error('Usuario no disponible');
      return;
    }
    const formData = this.createReportForm.value;
    const reportData = {
      user_id: this.user.id,
      report_type_id: parseInt(formData.report_type_id!),
      report_status_id: 1, // Asignar estado inicial
      description: formData.description,
      latitude: this.currentLatitude?.toString() || '', // Obtener latitud real
      longitude: this.currentLongitude?.toString() || '', // Obtener longitud real
    };
    const reportFormData = new FormData();
    reportFormData.append('json', JSON.stringify(reportData)); // Asumo que reportData está definido

    // 1. Crea un array de promesas para la conversión de fotos
    const photoPromises = this.photos.map(async (photo, index) => {
      // Usa await para esperar la conversión de cada foto
      const res = await fetch(photo.webPath!);
      const blob = await res.blob();

      // Agrega el Blob al FormData
      reportFormData.append('photos', blob, `photo_${index}.jpeg`);
    });

    try {
      // 2. Espera a que todas las promesas de fotos se completen
      await Promise.all(photoPromises);

      // 3. Una vez que todas las fotos están en reportFormData, envía la solicitud
      this.reportService.createReport(reportFormData).subscribe({
        next: (response: any) => { // Ajusta 'any' al tipo de tu responseMessage
          console.log('Reporte creado exitosamente:', response);
        },
        error: (error) => {
          console.error('Error al crear el reporte:', error);
        }
      });
    } catch (error) {
      console.error('Error al procesar las fotos:', error);
      // Manejo de error si falla la carga o conversión de alguna foto
    }
  }
}
