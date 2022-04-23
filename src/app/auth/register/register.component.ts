import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import Validation from '../../shared/validation/validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public _formBuilder: FormBuilder,
    private authService: AuthService) {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  submitForm() {
    const email = this.firstFormGroup.controls["email"].value;
    const password = this.secondFormGroup.controls["password"].value;

    this.authService.SignUp(email, password);
  }
}
