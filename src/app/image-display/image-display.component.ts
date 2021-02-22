import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {bindCallback, from, fromEvent, Observable, of, throwError} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {FileHandlerService, ForageFile} from '../file-handler.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnDestroy {
  @ViewChild('display') display!: ElementRef;

  constructor(private fileHandlerService: FileHandlerService) {
    this.fileHandlerService.getSelectedFile().pipe(
      switchMap((file) => from(this.fileHandlerService.getFileArrayBuffer(file.id))),
      switchMap((buffer) => {
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([buffer]));
        return fromEvent(reader, 'loadend');
      }),
      switchMap((event) => {
        if (event && event.target) {
          const target = event.target as FileReader;
          const tempImage = new Image();
          tempImage.src = target.result as string;
          return fromEvent(tempImage, 'load');
        } else {
          return throwError('image could not be loaded');
        }
      }),
      switchMap((event) => {
        const tempImage = event?.target as CanvasImageSource;
        const canvas = this.display.nativeElement as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = tempImage.width as number;
        canvas.height = tempImage.height as number;
        context?.drawImage(tempImage, 0, 0);
        return of(event);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
