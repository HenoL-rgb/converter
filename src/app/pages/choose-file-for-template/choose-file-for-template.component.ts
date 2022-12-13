import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-choose-file-for-template',
  templateUrl: './choose-file-for-template.component.html',
  styleUrls: ['./choose-file-for-template.component.scss'],
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


export class ChooseFileForTemplateComponent implements OnInit {

  constructor(public service: FilesService) { }


  ngOnInit(): void {
  }

}
