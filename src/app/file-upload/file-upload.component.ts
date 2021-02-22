import {Component, OnInit} from '@angular/core';
import {FileHandlerService} from '../file-handler.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  constructor(private fileHandlerService: FileHandlerService) { }

  ngOnInit(): void {
  }

  public handleFiles(event: Event): void {
    if (event && event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.item(0)) {
        this.fileHandlerService.setFile(files[0]);
      }
    }
  }
}
