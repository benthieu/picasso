import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FileHandlerService} from '../file-handler.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent {
  @ViewChild('display') display!: ElementRef;
  private file$: Observable<File | null>;

  constructor(private fileHandlerService: FileHandlerService) {
    this.file$ = this.fileHandlerService.getFile().pipe(
      tap()
    );
  }

}
