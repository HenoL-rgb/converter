import { AfterViewInit, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ width: 0, opacity: 0 }),
            animate('0.3s ease-out', 
                    style({ width: 100, opacity: 1 }))
          ]
        ),
        // transition(
        //   ':leave', 
        //   [
        //     style({  opacity: 1 }),
        //     animate('1s ease-in', 
        //             style({  opacity: 0 }))
        //   ]
        // )
      ]
    )
  ]
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUpload', {static: true}) uploadInput!: HTMLInputElement;
  constructor(private http: HttpClient, public service:FilesService) { }  

  log() {
    console.log('here')
  }

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
      this.uploadInput.files = null;
      this.uploadInput.value = '';
      this.service.fileName = '';
      this.service.isUploaded = false;
    }

  }

  ngAfterViewInit(): void {

  }

}
