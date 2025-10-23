import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonToolbar, IonTitle , } from '@ionic/angular/standalone';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { token } from '../core/interfaces/token';
import { Auth } from '../core/services/auth/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink,CommonModule, IonInput, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonToolbar, IonTitle,ReactiveFormsModule]
})
export class LoginComponent  implements OnInit {

  constructor(private authService: Auth, private router: Router) { }

  ngOnInit() {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (token: token) => {
      this.authService.setToken(token.token);
      console.log('Login exitoso, token almacenado');
      (document.activeElement as HTMLElement)?.blur();
      this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.error('Error en el login', error);
      }
    });
  }
}
