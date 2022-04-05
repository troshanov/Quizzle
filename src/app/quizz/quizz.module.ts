import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomQuizzComponent } from './random-quizz/random-quizz.component';
import { SharedModule } from '../shared/shared.module';
import { QuizzRoutingModule } from './quizz-routing.module';



@NgModule({
  declarations: [
    RandomQuizzComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizzRoutingModule
  ]
})
export class QuizzModule { }
