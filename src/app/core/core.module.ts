import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    SidebarComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class CoreModule { }
