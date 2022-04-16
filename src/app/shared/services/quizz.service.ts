import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.quizzApiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private client: HttpClient) { }

  getQuestions(difficulty:string = '', category: number = 0): Observable<any> {
    return this.client.get<any>(`${apiUrl}/api.php?amount=5&type=multiple&encode=url3986&category=${category}&difficulty=${difficulty}`);
  }

  getCategories(): Observable<any> {
    return this.client.get<any>(`${apiUrl}/api_category.php`);
  }
}
