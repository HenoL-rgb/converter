import { Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-file-form-component',
  templateUrl: './file-form-component.component.html',
  styleUrls: ['./file-form-component.component.scss']
})
export class FileFormComponentComponent implements OnInit {

  @ViewChild('fileUpload', {static: true}) uploadInput!: HTMLInputElement;
  @ViewChild('fileContainer') fileContainer;
  
  constructor(public service:FilesService) { }  

  restoreInput() {
    this.uploadInput.files = null;
    this.uploadInput.value = '';
    this.service.fileName = '';
    this.service.file = null;
    this.service.isUploaded = false;
  }

  fileName = '';

  saveToAssets() {
    // const file:File | null = files?.item(0);
    // if(file) {
    //   const link = document.createElement('a');
    //   link.setAttribute('target', '_blank');
    //   link.setAttribute('href', 'file');
    //   link.setAttribute('download', `/assets/file.pdf`);
    //   document.body.appendChild(link);
    //   link.click();
    //   link.remove();
    //   }

  }
  ngOnInit(): void {
    if(this.service.isUploaded == false){
      this.restoreInput();
    }

  }

  checkFile(event: Event) {

    console.log('event')

    const target = event.target as HTMLInputElement;

    if(target.files == null || target.files?.length == 0) return;

    if(target.files[0]?.name.split('?')[0].split('.').pop() != 'docx'){
      this.fileContainer.nativeElement.classList.add('error');
      
      this.restoreInput();

      return;
    }

    this.fileName = target.files[0].name;
  
    this.fileContainer.nativeElement.classList.remove('error')
    this.service.onFileSelected(event);
  }

}
