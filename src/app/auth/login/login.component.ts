import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFailed: boolean = false;

  constructor(private authService: AuthService) { }

  async onLogin(form: NgForm) {
    this.loginFailed = false;
    
    const email = form.controls["emailInput"].value;
    const password = form.controls["password"].value;

    await this.authService.SignIn(email, password)
    .catch(() => {
      this.loginFailed = true;
    })
  }
}
