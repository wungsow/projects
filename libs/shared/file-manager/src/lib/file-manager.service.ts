import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor() { }

  saveJsonToFile(json: any, fileName: string) {
    const blob = new Blob([JSON.stringify(json)], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }
}
