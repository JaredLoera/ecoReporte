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


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
    imports: [IonButton, IonInput, IonContent, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent  implements OnInit {

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
    if (this.registerForm.invalid || !this.passwordMatch) {
      return;
    }
    this.userProfile = {

      full_name: this.registerForm.value.full_name!,
      email: this.registerForm.value.email!,
      age: this.registerForm.value.age!.toString(),
      curp: this.registerForm.value.curp!,
      password: this.registerForm.value.password!,
    }
    this.userService.createUser(this.userProfile).subscribe({
      next: (response) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error registrando usuario', error);
      }
    });
  }
  //keyUpdate to confirm password
  confirmPassword() {
    this.passwordMatch = false;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    this.passwordMatch = password === confirmPassword;
  }

}
