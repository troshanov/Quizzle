import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MatRadioChange } from '@angular/material/radio/radio';
import { ITokenResponse } from 'src/app/shared/interfaces/token-response';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.css']
})
export class CreateQuizzComponent {

  @ViewChild('questionBox') questionBox: ElementRef;
  @ViewChild('bonusQuestion') bonusQuestionEl: ElementRef;

  options: FormGroup;

  categories: ICategory[];
  allQuestions: IQuestion[] = [];
  loadedQuestions: IQuestion[] = [];
  quizzQuestions: IQuestion[] = [];
  bonusQuestions: IQuestion[] = [];

  get canDropQuestions(): boolean { return this.quizzQuestions.length < 2; };
  get canDropBonusQuestion(): boolean { return this.bonusQuestions.length < 1; };

  questionsAreTouched: boolean = false;
  bonusQuestionIsTouched: boolean = false;
  allQuestionsIndex: number;
  questionApiToken: string;
  isLinear: boolean = true;

  titleFormGroup: FormGroup;
  quizzFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizzService: QuizzService,
    private utilityService: UtilityService,
    private fireService: FirebaseService,
    private authService: AuthService,
    private router: Router) {
    quizzService.getCategories()
      .subscribe((data) => {
        this.categories = data.trivia_categories as ICategory[];
      });

    quizzService.getToken()
      .subscribe((data) => {
        this.questionApiToken = (data as ITokenResponse).token;
      });

    this.titleFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.quizzFormGroup = this.fb.group({
      difficulty: [''],
      category: [''],
    });
  }

  onDifficultyChange(event: MatRadioChange) {
    this.reloadQuestions();
  }

  async submitQuizz() {
    const newQuizz: IQuestion[] = Array.from(this.quizzQuestions);
    newQuizz.unshift(this.bonusQuestions[0]);
    const userId = (this.authService.userData as IUser).email;
    const quizzName = this.titleFormGroup.controls['title'].value;

    await this.fireService.createUserQuizz(userId, quizzName, newQuizz)
      .then(() => this.router.navigate(['/home']))
      .catch((error) => alert(error.message));
  }

  drop(event: CdkDragDrop<IQuestion[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if (event.container.element.nativeElement.id === this.questionBox.nativeElement.id && event.container.data.length >= 2) {
        return;
      } else if (event.container.element.nativeElement.id === this.bonusQuestionEl.nativeElement.id && event.container.data.length >= 1) {
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  reloadQuestions() {
    this.loadedQuestions = [];
    const diff = this.quizzFormGroup.controls['difficulty'].value as string;
    const cat = this.quizzFormGroup.controls['category'].value as number;

    this.quizzService.getQuestions(this.questionApiToken, diff, cat)
      .subscribe((data) => {
        (data.results as IQuestion[]).forEach(q => {
          this.utilityService.decodeQuestionStringValues(q);
          this.loadedQuestions.push(q);
        });
      });
  }

  resetQuizz(stepper: any){
    this.loadedQuestions = [];
    this.bonusQuestions = [];
    this.quizzQuestions = [];

    stepper.reset();
  }
}
