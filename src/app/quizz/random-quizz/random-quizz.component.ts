import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { QuizzService } from 'src/app/shared/services/quizz.service';

@Component({
  selector: 'app-random-quizz',
  templateUrl: './random-quizz.component.html',
  styleUrls: ['./random-quizz.component.css']
})
export class RandomQuizzComponent{

  questions: IQuestion[];
  currentQuestion: IQuestion | undefined;
  currentAnswers: string[];
  currentCorrectAnswer: string;
  $stream: Subscription;

  constructor(private quizzService: QuizzService) {
    this.$stream = quizzService.getRandom()
      .subscribe((data: any) => {
        this.questions = data.results;
        this.currentQuestion = this.questions.shift();
        this.currentAnswers = this.currentQuestion?.incorrect_answers ?? [];
        this.currentAnswers?.push(this.currentQuestion?.correct_answer ?? '');
        this.shuffle(this.currentAnswers)
      });
  }
  // ngOnDestroy(): void {
  //   this.$stream.unsubscribe();
  // }

  private shuffle(a:string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
