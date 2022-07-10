import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConvertService } from '../../_services/convert.service';

import { ConvertFile } from '../../core/models/models.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private myService: ConvertService) {}

  @ViewChild('fileDropRef', { static: false }) fileDropEl: any;

  loader: string = 'none';
  files: any[] = [] as ConvertFile[]

  ngOnInit(): void {}

  fileFormat($event: Event, index: number) {
    const keyName = $event.target as HTMLInputElement
    this.files[index][keyName.name] = keyName.value;
    console.log($event.target, index, this.files);
  }
  /**
   * on file start convert
   */
  converter() {
    this.loader = 'inline-block';
    console.log(this.files);
    this.files.forEach((item: any) => {
      this.myService.convert(item).subscribe(
        (data: any) => {
          this.loader = 'none';
          console.log(data);
        },
        (error) => {
          this.loader = 'none';
          console.log(error);
        }
      );
    });
  }

  /**
   * on file downloads
   */
  download() {
    console.log('download', this.files);
    this.loader = 'inline-block';

    this.files.forEach((item: any) => {
      this.myService.getConvertedFile(item).subscribe(
        (data: any) => {
          this.loader = 'none';
          // const typeFound = this.files[0].name;
          const blob = new Blob([data]);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${item.name}.${item.format}`;
          link.click();
          window.URL.revokeObjectURL(link.href);
        },
        (error) => {
          this.loader = 'none';
          console.log(error);
        }
      );
    });
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
    const k: number = 1024;
    const dm: number = decimals <= 0 ? 0 : decimals;
    const sizes: any[] = [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // TESTING
    // Test Format
    get filesInner(): ConvertFile {
      return this.files[0]
    }
}
function convert(files: any[]) {
  throw new Error('Function not implemented.');
}
