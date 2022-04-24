import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IQuestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  createUserQuizz(authorId: string, quizzTitle: string, questions: IQuestion[]): Promise<any> {
    return this.firestore
      .collection('authors').doc(authorId)
      .collection('quizzes').doc(quizzTitle)
      .set(Object.assign({}, questions));
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
}
