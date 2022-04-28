import { Component } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { Renderer2 } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {

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
  quizzId: string;

  dialogConfigs: MatDialogConfig = new MatDialogConfig();

  constructor(
    private utilityService: UtilityService,
    private quizzService: QuizzService,
    private render: Renderer2,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private usersService: UserService) {

    this.route.queryParams.subscribe(params => {
      this.quizzId = decodeURIComponent(params['id']);
    })

    if (this.quizzId !== 'undefined') {
      this.getQuestions(false);
    }
    else {
      this.getQuestions(true);
    }

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

  getQuestions(isRandom: boolean) {
    if(isRandom){
      this.quizzService.getRandomQuestions()
      .subscribe((data: any) => {
        this.questions = (data.results as IQuestion[]);
        this.bonusQuestion = this.questions.shift();
        this.fiftyfiftyIsUsed = false;
        this.skipQuestionIsUsed = false;
        this.numberOfQuestions = this.questions.length;
        this.currentQuestionNumber = 0;
        this.loadNextQuestion();
        this.isLoading = false;
      });
    }else {
      this.usersService.getQuizzById(this.quizzId)
      .subscribe((data: any) => {
        this.questions = data.data().questions;
        this.bonusQuestion = this.questions.shift();
        this.fiftyfiftyIsUsed = false;
        this.skipQuestionIsUsed = false;
        this.numberOfQuestions = this.questions.length;
        this.currentQuestionNumber = 0;
        this.loadNextQuestion();
        this.isLoading = false;
      })
    }
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
