import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import {DEFAULT_CONFIG, NgForageOptions, NgForageConfig, Driver} from 'ngforage';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ImageDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'Picasso',
        driver: [ // defaults to indexedDB -> webSQL -> localStorage
          Driver.INDEXED_DB
        ]
      } as NgForageOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
