import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

     constructor(private swUpdate: SwUpdate) {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        if (confirm('Nueva versión disponible. ¿Desea actualizar?')) {
          window.location.reload();
        }
      }
    });
  }
}

 if (typeof Worker !== 'undefined') {
     // Create a new
     const worker = new Worker(new URL('./worker.worker', import.meta.url));
     worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
     };
     worker.postMessage('hello');
  } else {
     // Web workers are not supported in this environment.
     // You should add a fallback so that your program still executes correctly.
  }