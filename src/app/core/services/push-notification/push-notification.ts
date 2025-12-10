import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { responseMessage } from '../../interfaces/responseMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotification {

    private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


    async requestPermission(): Promise<boolean> {
    const permission = await Notification.requestPermission();

    console.log('Permiso:', permission);

    return permission === 'granted';
  }

  async subscribeToPush(): Promise<any> {
      const registration = await navigator.serviceWorker.getRegistration('/push-sw.js');
      const subscription = await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BMRh0e9fgQg0Ag7UK7sEEuyt8OqkgrWNvNn73hXde-iD-dESIrtmCua3y8_1NCkf9yhjDVUESgK8YL3LB29HMYc"
      })
      console.log('Subscrito:', subscription)
      return this.http.post(`${this.apiUrl}/subscribe`, { subscription });
    }


  async subscribeToPushp(): Promise<void> {
    const registration = await navigator.serviceWorker.getRegistration('/push-sw.js');
    const subscription = await registration?.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "BMRh0e9fgQg0Ag7UK7sEEuyt8OqkgrWNvNn73hXde-iD-dESIrtmCua3y8_1NCkf9yhjDVUESgK8YL3LB29HMYc"
    })
    console.log('Subscrito:', subscription)

    // enviarlo a tu API
    await fetch('https://tu-api.com/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription })
    })
  }
}
