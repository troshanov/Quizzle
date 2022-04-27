import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IQuestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  createUserQuizz(authorId: string, quizzTitle: string, questions: IQuestion[]): Promise<any> {
    return this.firestore
      .collection('quizzes').doc(quizzTitle)
      .set({
        questions: Object.assign([], questions),
        authorId: authorId,
        createdOn: Date.now(),
        title: quizzTitle
      });
  }

  updateProfilePicture(picture64: string, userId: string): Promise<any> {
    return this.firestore
      .collection('avatars').doc(userId)
      .set({
        photoURL: picture64
      });
  }

  getUserById(userId: string): Observable<any> {
    return this.firestore
      .collection('avatars')
      .doc(userId)
      .valueChanges();
  }

  getAllQuizzes(): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.orderBy('createdOn', 'desc').limit(2))
      .get();
  }

  getAllUserQuizzes(authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).orderBy('createdOn', 'desc').limit(2))
      .get();
  }

  getNextSetOfQuizzes(startAfterEl: any): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.orderBy('createdOn', 'desc').limit(2).startAfter(startAfterEl))
      .get();
  }

  getNextSetOfUserQuizzes(startAfterEl: any, authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).orderBy('createdOn', 'desc').limit(2).startAfter(startAfterEl))
      .get();
  }

  getPreviousSetOfQuizzes(startAtEl: any, endBeforeEl: any): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.orderBy('createdOn', 'desc').startAt(startAtEl).endBefore(endBeforeEl).limit(2))
      .get();
  }

  getPreviousSetOfUserQuizzes(startAtEl: any, endBeforeEl: any, authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).orderBy('createdOn', 'desc').startAt(startAtEl).endBefore(endBeforeEl).limit(2))
      .get();
  }

  getQuizzById(quizzId: string) {
    return this.firestore
      .collection('quizzes')
      .doc(quizzId)
      .get();
  }
}
