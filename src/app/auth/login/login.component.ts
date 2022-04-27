import { Component, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public ngZone: NgZone ) { }

  onLogin(form: NgForm) {
    this.loginFailed = false;
    
    const email = form.controls["emailInput"].value;
    const password = form.controls["password"].value;

    this.authService.SignIn(email, password)
    .catch(() => {
      this.loginFailed = true;
    })

    if(!this.loginFailed){
      this.router.navigate(['../home']);
    }
  }
}
