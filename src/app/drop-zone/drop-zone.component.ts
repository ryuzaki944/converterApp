import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
})
export class DropZoneComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) //fileDropEl: ElementRef;

  files: any[] = [];

  // onFileDropped($event) {
  //   // this.prepareFilesList($event);
  // }
  // fileBrowseHandler(files) {
  //   // this.prepareFilesList(files);
  // }

  constructor() {}

  ngOnInit(): void {}

  
}
