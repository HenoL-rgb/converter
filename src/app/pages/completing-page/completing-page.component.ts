import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from 'src/app/services/files.service';


@Component({
  selector: 'app-completing-page',
  templateUrl: './completing-page.component.html',
  styleUrls: ['./completing-page.component.scss']
})
export class CompletingPageComponent implements OnInit, OnDestroy {

  
  constructor(private http:HttpClient, public service:FilesService, private route: Router) { }
  
  properties: string[] = [];
  documentTitle = this.service.fileName || 'Untitled';

  ngOnInit(): void {
    if(this.service.file == null) {
      this.route.navigate(['/main'])
    }
    this.documentTitle = this.service.fileName;
    this.getProperties();
  }

  getProperties(): void {
    this.service.getFileReplacements()?.subscribe(res => {
      this.properties = [...res];
      if(this.properties[0] == '-error'){
        alert('something went wrong');
        this.properties.length = 0;
        this.route.navigate(['/main'])
      }
    });
 
  }

  setObjectProperties(field) { 
    this.service.testObj[`${field.id}`] = field.value;
  }

  clearFileInput() {
    this.service.isUploaded = false;
    sessionStorage.removeItem('properties');
  }

  ngOnDestroy(): void {
    this.service.isUploaded = false;
    this.service.fileName = '';
  }
}

  // if(sessionStorage.hasOwnProperty('properties')) {
    //   this.properties = sessionStorage.getItem('properties')!.split(',');
    //   return;
    // }
    //sessionStorage.setItem('properties', this.properties.join(','));