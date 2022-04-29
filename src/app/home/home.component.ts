import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  uesrId: string;
  tableData: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prev_strt_at: any = [];
  pagination_clicked_count = 0;
  disable_next: boolean = false;
  disable_prev: boolean = true;

  mineTabActivated: boolean = false;

  displayedColumns: string[] = ['title', 'authorId', 'createdOn'];

  constructor(
    private fireService: FirebaseService,
    private router: Router) {

    this.uesrId = JSON.parse(localStorage.getItem('user') as string).email;
    this.getQuizzes();
  }

  async getQuizzes() {
    const funcToCall = this.mineTabActivated ? 'getAllUserQuizzes' : 'getAllQuizzes';

    this.fireService[funcToCall](this.uesrId)
      .subscribe((data) => {
        if (!data.docs.length) {
          console.log('No data available');
        }
        else {
          this.firstInResponse = data.docs[0];
          this.lastInResponse = data.docs[data.docs.length - 1];

          this.tableData = [];
          for (let doc of data.docs) {
            this.tableData.push(doc.data());
          }

          this.push_prev_startAt(this.firstInResponse);
        }
      }, error => {
        console.log(error)
      });
  }

  nextPage() {
    const funcToCall = this.mineTabActivated ? 'getNextSetOfUserQuizzes' : 'getNextSetOfQuizzes';

    this.fireService[funcToCall](this.lastInResponse, this.uesrId)
      .subscribe((data) => {
        if (!data.docs.length) {
          console.log('No data available');
          this.disable_next = true;
          return;
        }
        else {
          this.firstInResponse = data.docs[0];
          this.lastInResponse = data.docs[data.docs.length - 1];

          this.tableData = [];
          for (let doc of data.docs) {
            this.tableData.push(doc.data());
          }

          this.pagination_clicked_count++;
          this.push_prev_startAt(this.firstInResponse);
          if (data.docs.length < 10) {
            // disable next button if data fetched is less than 5 - means no more data left to load
            // because limit ti get data is set to 5
            this.disable_next = true;
          } else {
            this.disable_next = false;
          }
          this.disable_prev = false;
        }
      }, error => {
        console.log(error)
      });
  }

  previousPage() {

    const funcToCall = this.mineTabActivated ? 'getPreviousSetOfUserQuizzes' : 'getPreviousSetOfQuizzes';
    
    this.fireService[funcToCall](this.get_prev_startAt(), this.firstInResponse, this.uesrId)
      .subscribe((data) => {
        if (!data.docs.length) {
          console.log('No data available');
        }

        this.firstInResponse = data.docs[0];
        this.lastInResponse = data.docs[data.docs.length - 1];

        this.tableData = [];

        for (let item of data.docs) {
          this.tableData.push(item.data());
        }

        this.pagination_clicked_count--;
        this.pop_prev_startAt(this.firstInResponse);
        if (this.pagination_clicked_count == 0) {
          this.disable_prev = true;
        } else {
          this.disable_prev = false;
        }
        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });
  }

  switchTab(){
    this.tableData = [];
    this.mineTabActivated = !this.mineTabActivated;
    this.firstInResponse = [];
    this.lastInResponse = [];
    this.prev_strt_at = [];
    this.pagination_clicked_count = 0;
    this.disable_next = false;
    this.disable_prev = true;
    this.getQuizzes();
  }

  goToQuizz(row: any){
    this.router.navigate(['/quizz'], {queryParams: {id: row.title}});
  }
  // add a document
  private push_prev_startAt(prev_first_doc: any) {
    this.prev_strt_at.push(prev_first_doc);
  }
  // remove non required document 
  private pop_prev_startAt(prev_first_doc: any) {
    this.prev_strt_at.forEach((element: any) => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }
  // return the Doc rem where previous page will startAt
  private get_prev_startAt(): any {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1)) {
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    }
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }
}
