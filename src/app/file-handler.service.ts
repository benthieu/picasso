import {Injectable} from '@angular/core';
import {NgForage} from 'ngforage';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {
  private files$ = new BehaviorSubject<Array<ForageFile>>([]);

  constructor(private readonly ngf: NgForage) {
    this.ngf.getItem('files').then((files) => {
      if (files) {
        this.files$.next(files as Array<ForageFile>);
      }
    });
  }

  public createNewFile(newFile: File): void {
    const newForageFile = new ForageFile(uuid(), newFile.name, newFile.type);
    newForageFile.selected = true;
    newFile.arrayBuffer().then((buffer) => {
      this.ngf.setItem(newForageFile.id, buffer);
      this.updateFiles([
        ...this.files$.getValue().map((file) => {
          file.selected = false;
          return file;
        }),
        newForageFile
      ]);
    });
  }

  public setFileSelected(id: string): void {
    this.updateFiles(this.files$.getValue().map((file) => {
      if (file.id === id) {
        file.selected = true;
      } else {
        file.selected = false;
      }
      return file;
    }));
  }

  public getSelectedFile(): Observable<ForageFile> {
    return this.getFiles().pipe(
      switchMap((files) => {
        return files.filter((file) => file.selected);
      })
    );
  }

  public getFiles(): Observable<Array<ForageFile>> {
    return this.files$.asObservable();
  }

  public updateFiles(files: Array<ForageFile>): void {
    this.ngf.setItem('files', files);
    this.files$.next(files);
  }

  public getFileArrayBuffer(id: string): Promise<ArrayBuffer> {
    return this.ngf.getItem(id);
  }
}

export class ForageFile {
  public selected = false;
  public dateCreated: string;
  constructor(public id: string, public name: string, public type: string) {
    this.dateCreated = new Date().toISOString();
  }
}
