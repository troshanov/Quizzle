import { Component } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { Renderer2 } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ITokenResponse } from 'src/app/shared/interfaces/token-response';

@Component({
  selector: 'app-random-quizz',
  templateUrl: './random-quizz.component.html',
  styleUrls: ['./random-quizz.component.css']
})
export class RandomQuizzComponent {

  isLoading: boolean = true;

  fiftyfiftyIsUsed: boolean;
  skipQuestionIsUsed: boolean;
  hasSelectedAnswer: boolean;
  hasSelectedCorrectAnswer: boolean;
  numberOfQuestions: number;
  currentQuestionNumber: number = 0;
  quizzProgressValue: number;

  questions: IQuestion[];
  currentQuestion: IQuestion | undefined;
  bonusQuestion: IQuestion | undefined;
  currentAnswers: string[];
  currentCorrectAnswer: string | undefined;
  questionApiToken: string;

  dialogConfigs: MatDialogConfig = new MatDialogConfig()

  constructor(
    private utilityService: UtilityService,
    private quizzService: QuizzService,
    private render: Renderer2,
    public dialog: MatDialog) {

    this.quizzService.getToken()
      .subscribe((data) => {
        this.questionApiToken = (data as ITokenResponse).token;
        this.getQuestions();
      });

    this.dialogConfigs.disableClose = true;
  }

  fiftyFiftyClickHandler(answers: MatSelectionList) {
    this.fiftyfiftyIsUsed = true;
    const firstEliminated = answers.options.find(a => a.value !== this.currentCorrectAnswer);
    const secondEliminated = answers.options.find(a => a.value !== this.currentCorrectAnswer && a.value !== firstEliminated?.value);

    this.render.addClass(firstEliminated?._getHostElement(), 'eliminated-answer');
    this.render.addClass(secondEliminated?._getHostElement(), 'eliminated-answer');
  }

  skipQuestionClickHandler() {
    this.skipQuestionIsUsed = true;
    this.utilityService.decodeQuestionStringValues(this.bonusQuestion);
    this.currentQuestion = this.bonusQuestion;
    this.setAnswers(this.currentQuestion);
  }

  selectAnswerHandler(answers: MatSelectionList) {
    const selectedAnswer = answers.selectedOptions.selected[0];
    const correctAnswer = answers.options.find(a => a.value === this.currentCorrectAnswer);
    this.hasSelectedAnswer = true;

    if (selectedAnswer.value !== this.currentCorrectAnswer) {

      this.render.addClass(selectedAnswer._getHostElement(), "incorrect-answer");
      this.render.addClass(correctAnswer?._getHostElement(), "correct-answer");

      return;
    }

    this.hasSelectedCorrectAnswer = true;
    this.render.addClass(correctAnswer?._getHostElement(), "correct-answer");

    of(null).pipe(delay(5000))
      .subscribe(() => this.loadNextQuestion());
  }

  getQuestions() {
    this.quizzService.getQuestions(this.questionApiToken)
      .subscribe((data: any) => {
        this.questions = data.results;
        this.bonusQuestion = this.questions.shift();
        this.fiftyfiftyIsUsed = false;
        this.skipQuestionIsUsed = false;
        this.numberOfQuestions = data.results.length;
        this.currentQuestionNumber = 0;
        this.loadNextQuestion();
        this.isLoading = false;
      });
  }

  private calculateProgress() {
    let multiplier = 100 / this.numberOfQuestions;
    this.quizzProgressValue = multiplier * this.currentQuestionNumber;
  }

  private loadNextQuestion() {

    this.hasSelectedCorrectAnswer = false;
    this.hasSelectedAnswer = false;
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions.shift();

      //Cater for progress bar
      this.currentQuestionNumber++;
      this.calculateProgress();

      //Setup current question and answers
      this.utilityService.decodeQuestionStringValues(this.currentQuestion);
      this.setAnswers(this.currentQuestion);
    }
    else {
      this.dialog.open(SuccessDialogComponent, this.dialogConfigs);
    }
  }

  private setAnswers(question: IQuestion | undefined): void {
    this.currentAnswers = question?.incorrect_answers ?? [];
    this.currentAnswers?.push(question?.correct_answer ?? '');
    this.shuffle(this.currentAnswers);
    this.currentCorrectAnswer = question?.correct_answer;
  }

  private shuffle(a: string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
