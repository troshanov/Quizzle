import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
  styleUrls: ['./failure-dialog.component.css']
})
export class FailureDialogComponent  {

  @Input()
  retryFunciton: any;


  retryClickHandler(){
    this.retryFunciton();
  }
}
