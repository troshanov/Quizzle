import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isLogged = false;

  constructor(public authService: AuthService) { }
    
  logout() {
    this.authService.SignOut();
  }
}
