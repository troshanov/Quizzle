import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MatRadioChange } from '@angular/material/radio/radio';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.css']
})
export class CreateQuizzComponent {

  options: FormGroup;
  categories: ICategory[];

  loadedQuestions: IQuestion[] = [];
  quizzQuestions: IQuestion[] = [];

  constructor(
    fb: FormBuilder,
    private quizzService: QuizzService,
    private utilityService: UtilityService) {
    quizzService.getCategories()
      .subscribe((data) => {
        this.categories = data.trivia_categories as ICategory[];
      });

    this.options = fb.group({
      difficulty: [''],
      category: [''],
      title: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onDifficultyChange(event: MatRadioChange) {
    this.reloadQuestions();
  }

  onCategoryChange() {
    this.reloadQuestions();
  }

  drop(event: CdkDragDrop<IQuestion[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private reloadQuestions() {
    this.loadedQuestions = [];
    const diff = this.options.controls['difficulty'].value as string;
    const cat = this.options.controls['category'].value as number;

    this.quizzService.getQuestions(diff, cat)
      .subscribe((data) => {
        (data.results as IQuestion[]).forEach(q => {
          this.utilityService.decodeQuestionStringValues(q);
          this.loadedQuestions.push(q);
        });
      });
  }
}
