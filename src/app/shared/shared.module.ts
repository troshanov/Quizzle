import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialExampleModule} from '../../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizzService } from './services/quizz.service';
import { UrlDecoderPipe } from './pipes/url-decoder.pipe';

@NgModule({
  declarations: [
    UrlDecoderPipe
  ],
  imports: [
    CommonModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    MaterialExampleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UrlDecoderPipe
  ],
  providers:[
    QuizzService
  ]
})
export class SharedModule { }
