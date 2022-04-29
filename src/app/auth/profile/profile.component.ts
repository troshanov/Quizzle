import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, of } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  imageSrc: string;

  get user(): IUser {
    return this.authService.userData as IUser;
  }

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private fireService: FirebaseService,
    private authService: AuthService) {
    this.downloadAvatar();
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

  submit() {

    const clientId = (this.authService.userData as IUser).uid;
    const content = this.myForm.controls['fileSource'].value;
    this.fireService.updateProfilePicture(content, clientId)
      .then(() => this.myForm.reset())
      .catch((err) => alert(err.message));
  }

  private downloadAvatar() {
    let clientId = this.user?.uid;
    if (!clientId) {
      clientId = JSON.parse(localStorage.getItem('user') as string).uid;
    }

    this.fireService.getUserById(clientId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.imageSrc = data.photoURL;
          }
        },
        error: (err) => { alert(err.message); },
      })

    of(null).pipe(
      delay(1000)
    ).subscribe(() => {
      if (!this.imageSrc) {
        this.imageSrc = `../../../assets/images/anon.png`;
      }
    })
  }
}
