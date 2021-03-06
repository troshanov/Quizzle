import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialExampleModule} from '../../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizzService } from './services/quizz.service';
import { UrlDecoderPipe } from './pipes/url-decoder.pipe';
import { UtilityService } from './services/utility.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoaderComponent } from './loader/loader.component';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    UrlDecoderPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
  ],
  exports:[
    MaterialExampleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UrlDecoderPipe,
    LoaderComponent,
  ],
  providers:[
    QuizzService,
    UtilityService,
    FirebaseService,
  ]
})
export class SharedModule { }
