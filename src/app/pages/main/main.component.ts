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
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('0.1s ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
  ]
})


export class MainComponent implements AfterViewInit {
  @ViewChild('fileUpload', {static: true}) uploadInput!: HTMLInputElement;
  @ViewChild('fileContainer') fileContainer;
  constructor(private http: HttpClient, public service:FilesService) { }  

  saveToAssets() {

  }


  ngAfterViewInit(): void {

  }

}
