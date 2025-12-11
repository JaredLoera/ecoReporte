import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { token } from '../core/interfaces/token';
import { Auth } from '../core/services/auth/auth';
import { User } from '../core/services/user/user';
import { user } from '../core/interfaces/user';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';
declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
    imports: [IonButton, IonInput, IonContent, ReactiveFormsModule, RouterLink]
})


export class RegisterComponent  implements OnInit {
  siteKey = '6LdN8CcsAAAAAF7SKKOrm8xuEgDG13SyExIVrA-x';
  captchaToken: string | null = null;
  result: boolean = false;
  constructor(private router: Router, private userService: User) { }

  
  passwordMatch: boolean = true;
  ngOnInit() { }
  userProfile: user | null = null;
  registerForm = new FormGroup({
    full_name: new FormControl(''),
    age: new FormControl(''),
    curp: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  async register() {
    if (this.registerForm.valid && this.passwordMatch) {
    
    }
  }
  //keyUpdate to confirm password
  confirmPassword() {
    this.passwordMatch = false;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    this.passwordMatch = password === confirmPassword;
  }
ngAfterViewInit() {
    // Renderiza el captcha manualmente
    setTimeout(() => {
      grecaptcha.render(document.querySelector('.g-recaptcha'), {
        sitekey: this.siteKey,
        callback: (response: string) => {
          this.captchaToken = response;
        }
      });
    }, 500);
  }
  

  resolved(captchaResponse: Event) {
    if (captchaResponse) {
      this.captchaToken = (captchaResponse as any).detail;
    } else {
      this.captchaToken = null;
    }
  }

  onSubmit() {
    this.result = this.captchaToken ? true : false;
    if (this.result) {
      console.log('Captcha verificado con éxito.');
    } else {
      console.log('Fallo en la verificación del captcha.');
    }
  }
}
