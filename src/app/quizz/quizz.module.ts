import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzComponent } from './quizz/quizz.component';
import { SharedModule } from '../shared/shared.module';
import { QuizzRoutingModule } from './quizz-routing.module';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { FailureDialogComponent } from './dialogs/failure-dialog/failure-dialog.component';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';



@NgModule({
  declarations: [
    QuizzComponent,
    SuccessDialogComponent,
    FailureDialogComponent,
    CreateQuizzComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuizzRoutingModule
  ]
})
export class QuizzModule { }
