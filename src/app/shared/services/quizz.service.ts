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

  getQuestions(token:string, difficulty:string = '', category: number = 0): Observable<any> {
    return this.client.get<any>(`${apiUrl}/api.php?amount=16&type=multiple&encode=url3986&category=${category}&token=${token}&difficulty=${difficulty}`);
  }

  getRandomQuestions(){
    return this.client.get<any>(`${apiUrl}/api.php?amount=16&type=multiple&encode=url3986`);
  }

  getCategories(): Observable<any> {
    return this.client.get<any>(`${apiUrl}/api_category.php`);
  }

  getToken(){
    return this.client.get<any>(`${apiUrl}/api_token.php?command=request`);
  }
}
