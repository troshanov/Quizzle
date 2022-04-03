import { Component } from '@angular/core';
import { ProblemsServiceService } from './problems-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizzle';
  problem: any;

  constructor(public service: ProblemsServiceService) {

  }

  GetUsers(){
    this.service.getProblem().subscribe((data) => this.problem = data);
  }
}
