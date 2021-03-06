import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IQuestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

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
      .collection('quizzes', ref => ref.limit(10).orderBy('createdOn', 'desc'))
      .get();
  }

  getAllUserQuizzes(authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).orderBy('createdOn', 'desc').limit(10))
      .get();
  }

  getNextSetOfQuizzes(startAfterEl: any): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.limit(10).orderBy('createdOn', 'desc').startAfter(startAfterEl))
      .get();
  }

  getNextSetOfUserQuizzes(startAfterEl: any, authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).limit(10).orderBy('createdOn', 'desc').startAfter(startAfterEl))
      .get();
  }

  getPreviousSetOfQuizzes(startAtEl: any, endBeforeEl: any): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.orderBy('createdOn', 'desc').startAt(startAtEl).endBefore(endBeforeEl).limit(10))
      .get();
  }

  getPreviousSetOfUserQuizzes(startAtEl: any, endBeforeEl: any, authorId: string): Observable<any> {
    return this.firestore
      .collection('quizzes', ref => ref.where('authorId', '==', authorId).orderBy('createdOn', 'desc').startAt(startAtEl).endBefore(endBeforeEl).limit(10))
      .get();
  }

  getQuizzById(quizzId: string) {
    return this.firestore
      .collection('quizzes')
      .doc(quizzId)
      .get();
  }
}
