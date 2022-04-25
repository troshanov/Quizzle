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
import { UserService } from './services/user.service';
import { DropboxService } from './services/dropbox.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    UrlDecoderPipe,
    LoaderComponent,
    SafeHtmlPipe
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
    SafeHtmlPipe
  ],
  providers:[
    QuizzService,
    UtilityService,
    UserService,
    DropboxService
  ]
})
export class SharedModule { }
