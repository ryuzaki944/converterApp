import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConvertService } from '../../_services/convert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private myService: ConvertService) {}

  @ViewChild('fileDropRef', { static: false }) fileDropEl: any;
  files: any[] = [];

  ngOnInit(): void {}

  fileFormat($event: any, index: number) {
    this.files[index].format = $event.target.value
    console.log($event.target.value, index, this.files);
  }

  converter() {
    this.myService.convert(this.files[0]).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  download() {
    debugger
    console.log('download', this.files);
    this.myService.getConvertedFile(this.files[0]).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    if (
      $event[0].type?.includes('image/jpeg') ||
      $event[0].type?.includes('image/svg+xml') ||
      $event[0].type?.includes('image/dicom+jpx')
    ) {
      this.prepareFilesList($event);
    }
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files?.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
function convert(files: any[]) {
  throw new Error('Function not implemented.');
}
