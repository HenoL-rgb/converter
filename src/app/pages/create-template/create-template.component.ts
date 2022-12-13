import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from 'src/app/services/files.service';
import { replacementInput } from 'src/app/interfaces/replacementInput';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  constructor(private http:HttpClient, public service:FilesService, private route: Router) { }
  
  inputFields: replacementInput[] = [
    {
      id: 1,
      from: '',
      to: '',
      state: 'all',
    },
  ];
  documentTitle = this.service.fileName || 'Untitled';

  ngOnInit(): void {
    if(this.service.file == null) {
      this.route.navigate(['/chooseFileForTemplate'])
    }

    
  }

  addInputField() {
    const id = (this.inputFields.at(-1) != undefined) ? this.inputFields.at(-1)!.id + 1 : 1;
 
    this.inputFields.push({
      id: id,
      from: '',
      to: '',
      state: 'all',
    })
  }

  removeInputField() {
    this.inputFields.pop();
  }

  setReplaceOne(btn1, btn2) {
    this.inputFields.forEach(input => {
      if (input.id == btn2.id) {
        input.state = 'one';
        return;
      }
    })

    btn1.classList.remove('active');
    btn2.classList.toggle('active');
  }

  setReplaceAll(btn1, btn2){
    this.inputFields.forEach(input => {
      if (input.id == btn1.id) {
        input.state = 'all';
        return;
      }
    })

    btn1.classList.toggle('active');
    btn2.classList.remove('active');
  }

  setValueFrom(field) {

    this.inputFields.forEach(input => {
      if (input.id == field.id) {
        input.from = field.value;
        return;
      }
    })

  }

  setValueTo(field) {
    this.inputFields.forEach(input => {
      if (input.id == field.id) {
        input.to = field.value;
        return;
      }
    })
    console.log(this.inputFields)
  }

  createFile() {
    this.service.generate2(this.inputFields);
    this.route.navigate(['/chooseFileForTemplate']);
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
