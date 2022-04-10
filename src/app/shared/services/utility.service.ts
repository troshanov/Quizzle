import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  decodeQuestionStringValues(questionObj: any): void {
    Object.keys(questionObj).forEach(key => {
      if (typeof questionObj[key] === 'string') {
        questionObj[key] = decodeURIComponent(questionObj[key]);
      } else if (Array.isArray(questionObj[key])) {
        for (let i = 0; i < questionObj[key].length; i++) {
          const element = questionObj[key][i];
          questionObj[key][i] = decodeURIComponent(element);
        }
      }
    });
  }
}
