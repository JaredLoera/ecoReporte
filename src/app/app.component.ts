import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
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