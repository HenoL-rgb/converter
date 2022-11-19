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
      // this.renderFields();
      return;
    }

    this.service.getFileReplacements()?.subscribe(res => {
      let str = this.service.getAllText(res)
      this.properties = str.split(' ');
      console.log(this.properties.toString());
      localStorage.setItem('properties', this.properties.toString());
      // this.renderFields();
    });
  }

  renderFields() {
    const container = document.getElementById('inputFieldsContainer');
    for(let property of this.properties) {
      const inputContainer = document.createElement('div');
      let input = document.createElement('input')
      let label = document.createElement('Label')

      input.id = `input_${property}`;
      input.placeholder = `${property}`
      input.setAttribute('type', 'text');
      label.setAttribute('for', input.id);
      label.innerHTML = `${property} `;
      inputContainer.classList.add('inputContainer');

      inputContainer.append(label, input);
      container?.append(inputContainer);
    }
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
  }
}
