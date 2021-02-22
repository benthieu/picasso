import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FileHandlerService} from './file-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public file$: Observable<File | null>;
  constructor(private fileHandlerService: FileHandlerService) {
    this.file$ = this.fileHandlerService.getFile().pipe(
      tap((val) => console.log(val))
    );
  }
}
