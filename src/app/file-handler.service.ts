import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {
  private file$ = new BehaviorSubject<File | null>(null);

  constructor() { }

  setFile(file: File): void {
    this.file$.next(file);
  }

  getFile(): Observable<File | null> {
    return this.file$.asObservable();
  }
}
