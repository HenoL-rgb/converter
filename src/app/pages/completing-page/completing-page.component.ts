import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-completing-page',
  templateUrl: './completing-page.component.html',
  styleUrls: ['./completing-page.component.scss']
})
export class CompletingPageComponent implements OnInit, OnDestroy {

  constructor(private http:HttpClient, public service:FilesService) { }
  
  properties: string[] = [];
  pdfSrc = `/assets/${this.service.fileName}`;

  ngOnInit(): void {

    this.getProperties();
    const input = document.getElementById('doc') as HTMLInputElement;
    console.log(this.properties)

  }

  getProperties(): void {
    if(localStorage.hasOwnProperty('properties')) {
      this.properties = localStorage.getItem('properties')!.split(',');
      return;
    }

    this.service.getFileReplacements()?.subscribe(res => {
      this.properties = [...res];
      localStorage.setItem('properties', this.properties.join(','));
    });
  }

  setObjectProperties(field) { 
    this.service.testObj[`${field.id}`] = field.value;
  }

  clearFileInput() {
    this.service.isUploaded = false;
    localStorage.removeItem('properties')
  }

  ngOnDestroy(): void {
    this.service.isUploaded = false;
    this.service.fileName = '';
    console.log('d')
  }
}
