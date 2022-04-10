import { Component } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { Renderer2 } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-random-quizz',
  templateUrl: './random-quizz.component.html',
  styleUrls: ['./random-quizz.component.css']
})
export class RandomQuizzComponent {

  fiftyfiftyIsUsed: boolean;
  skipQuestionIsUsed: boolean;
  hasSelectedAnswer: boolean;
  hasSelectedCorrectAnswer: boolean;
  numberOfQuestions: number;
  currentQuestionNumber: number = 0;
  quizzProgressValue: number;

  questions: IQuestion[];
  currentQuestion: IQuestion | undefined;
  currentAnswers: string[];
  currentCorrectAnswer: string | undefined;

  constructor(
    private utilityService: UtilityService,
    private quizzService: QuizzService,
    private render: Renderer2) {
    this.getQuestions();
  }

  fiftyFiftyClickHandler() {
    this.fiftyfiftyIsUsed = true;
  }

  skipQuestionClickHandler() {
    this.skipQuestionIsUsed = true;
  }

  selectAnswerHandler(answers: MatSelectionList) {
    const selectedAnswer = answers.selectedOptions.selected[0];
    const correctAnswer = answers.options.find(a => a.value === this.currentCorrectAnswer);
    this.hasSelectedAnswer = true;

    if (selectedAnswer.value !== this.currentCorrectAnswer) {

      this.render.addClass(selectedAnswer._getHostElement(), "incorrect-answer");
      this.render.addClass(correctAnswer?._getHostElement(), "correct-answer");

      this.fiftyfiftyIsUsed = true;
      this.skipQuestionIsUsed = true;

      //call modal with fail message
      return;
    }
    
    this.hasSelectedCorrectAnswer = true;
    this.render.addClass(correctAnswer?._getHostElement(), "correct-answer");

    of(null).pipe(delay(5000))
      .subscribe(() => this.loadNextQuestion());
  }

  getQuestions(){
    this.quizzService.getRandom()
      .subscribe((data: any) => {
        this.questions = data.results;
        this.numberOfQuestions = data.results.length;
        this.currentQuestionNumber = 0;
        this.loadNextQuestion();
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
      this.currentAnswers = this.currentQuestion?.incorrect_answers ?? [];
      this.currentAnswers?.push(this.currentQuestion?.correct_answer ?? '');
      this.shuffle(this.currentAnswers);
      this.currentCorrectAnswer = this.currentQuestion?.correct_answer;
    }
    else {
      //call modal with success message
    }
  }

  private shuffle(a: string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
