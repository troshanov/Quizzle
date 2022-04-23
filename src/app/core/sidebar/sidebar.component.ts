import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isLogged = false;

  constructor(
    private render: Renderer2,
    private authService: AuthService) { }
  MouseOverHandler(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      this.render.addClass(event.target, "active");
    }
  }

  MouseOutHandler(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      this.render.removeClass(event.target, "active");
    }
  }

  logout(){
    this.authService.SignOut();
  }
}
