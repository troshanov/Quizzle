import { Injectable } from '@angular/core';
import { Dropbox, DropboxResponse, files } from 'dropbox';
import * as path from 'path';
import { environment } from 'src/environments/environment';

const accessToken = environment.dropBoxConfig.accessToken;

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  private dbx: Dropbox;

  constructor() {
    this.dbx = new Dropbox({ accessToken: accessToken });
  }

  uploadProfilePicture(contents: any, userId: string): Promise<DropboxResponse<files.FileMetadata>> {
    const pictureId = this.uuidv4();
    console.log(this.dbx.usersGetCurrentAccount());

    return this.dbx.filesUpload({ path: `/Apps/Quizzle/${userId}/${pictureId}.png`, contents });
  }

  downloadProfilePicture(): Promise<DropboxResponse<files.FileMetadata>>  {
    return this.dbx.filesDownload({ path: `/Apps/Quizzle/nVvypTO5isPutdlPYPYBu3cn1ZS2/10ab0984-6a17-4ffd-a4d6-632137db18be.png` });
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
