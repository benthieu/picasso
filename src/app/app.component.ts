import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {share, shareReplay, tap} from 'rxjs/operators';
import {FileHandlerService, ForageFile} from './file-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public file$: Observable<ForageFile>;

  constructor(private fileHandlerService: FileHandlerService) {
    this.file$ = this.fileHandlerService.getSelectedFile().pipe(
      tap((val) => console.log(val))
    );
  }
}
