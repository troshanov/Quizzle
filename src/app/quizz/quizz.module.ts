import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomQuizzComponent } from './random-quizz/random-quizz.component';
import { SharedModule } from '../shared/shared.module';
import { QuizzRoutingModule } from './quizz-routing.module';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { FailureDialogComponent } from './dialogs/failure-dialog/failure-dialog.component';



@NgModule({
  declarations: [
    RandomQuizzComponent,
    SuccessDialogComponent,
    FailureDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizzRoutingModule
  ]
})
export class QuizzModule { }
