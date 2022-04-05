import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuizzComponent } from './random-quizz.component';

describe('RandomQuizzComponent', () => {
  let component: RandomQuizzComponent;
  let fixture: ComponentFixture<RandomQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
