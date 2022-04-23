import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  onLogin(form: NgForm) {
    form.controls;
    const email = form.controls["emailInput"].value;
    const password = form.controls["password"].value;

    this.authService.SignIn(email, password);
  }
}
