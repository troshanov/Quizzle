import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tableData: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prev_strt_at: any = [];
  pagination_clicked_count = 0;
  disable_next: boolean = false;
  disable_prev: boolean = true;

  displayedColumns: string[] = ['title', 'authorId', 'createdOn'];

  constructor(private userService: UserService) { 
    this.getQuizzes();
  }

  getQuizzes() {
    this.userService.getAllQuizzes()
      .subscribe((data) => {
        if (!data.docs.length) {
          console.log('No data available');
        }
        else {
          this.firstInResponse = data.docs[0];
          this.lastInResponse = data.docs[data.docs.length = 1];

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
    this.userService.getNextSetOfQuizzes(this.lastInResponse)
      .subscribe((data) => {
        if (!data.docs.length) {
          console.log('No data available');
        }
        else {
          this.firstInResponse = data.docs[0];
          this.lastInResponse = data.docs[data.docs.length = 1];

          this.tableData = [];
          for (let doc of data.docs) {
            this.tableData.push(doc.data());
          }

          this.pagination_clicked_count++;
          this.push_prev_startAt(this.firstInResponse);
          if (data.docs.length < 2) {
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
    this.userService.getPreviousSetOfQuizzes(this.get_prev_startAt(), this.firstInResponse)
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
