import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IQuestion } from '../interfaces/question';

const apiUrl = environment.quizzApiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private client: HttpClient) { }

  getRandom(): Observable<any>{
    return this.client.get<any>(`${apiUrl}/api.php?amount=15&type=multiple&encode=url3986`);
  }
}
