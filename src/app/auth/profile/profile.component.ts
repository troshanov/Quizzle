import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  imageSrc: string = '';
  
  get user(): IUser{
    return this.authService.userData as IUser
  }

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private userService: UserService,
    private authService: AuthService) {
    this.download();
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  download() {
    const clientId = JSON.parse(localStorage.getItem('user') as string).uid;

    this.userService.getUserById(clientId)
      .subscribe((data) => {
        this.imageSrc = data.photoURL;
      })
  }
  submit() {
    console.log(this.myForm.value);

    const clientId = (this.authService.userData as IUser).uid;
    const content = this.myForm.controls['fileSource'].value;
    this.userService.updateProfilePicture(content, clientId)
      .then(() => this.download())
      .catch((err) => alert(err.message));
  }
}
