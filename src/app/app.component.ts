import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizzle';
  problem: any;

  constructor() {

  }

  // GetUsers(){
  //   this.service.getProblem().subscribe((data) => this.problem = data);
  // }
}
