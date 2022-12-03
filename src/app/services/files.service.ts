import { Injectable, Input } from '@angular/core';
import Docxtemplater from 'docxtemplater';
import PizZip, { LoadData } from 'pizzip';
import { saveAs } from 'file-saver';
import { delay, lastValueFrom, Observable } from 'rxjs';
import { convertWordFiles } from 'convert-multiple-files';



@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  fileName = '';
  isUploaded = false;
  file: any = null;  
  teststr = '';
  properties: string[] = [];
  testObj = {};

  // setObjectProperties(str: string) { 
  //   const objPropeties = str.split(' ');

  //   objPropeties.forEach(property => {
  //     this.testObj[`${property}`] = '';
  //   })

  // }

  getAllText(str: any): string {
    let finalStr = '';
    for(let i = 0; i < str.length; i++){
      if(str.charAt(i) == '<' && str.charAt(i+1) == '/' &&
      str.charAt(i+2) == 'w' && str.charAt(i+3) == ':' && str.charAt(i+4) == 't' && str.charAt(i+5) == '>'){
        let teststr = '';
        for(let j = i-1; j > 0; j--){
          if(str.charAt(j) == '>') break; 
          teststr += str.charAt(j);
        }
        finalStr += teststr.split('').reverse().join('')
      }
    }
    //finalStr = this.removeGarbage(finalStr);
    return finalStr;
  }

  // removeGarbage(finalStr: string): string {
    
  //   let str: string = '';

  //   for(let i = 0; i < finalStr.length; i++){
  //     if(finalStr.charAt(i-1) == '{'){
  //       while(finalStr.charAt(i) != '}'){
  //         str += finalStr.charAt(i);
  //         i++;
  //       }
  //       str += ' ';
  //       i++;
  //     }
  //   }

  //   return str.slice(0, str.length - 1);
  // }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.files == null) return;

    const file:File = this.file == null ? target.files[0] : this.file;

    if (file) {
      this.file = file;
      
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
      this.isUploaded = true;
      
      return;
    } 
  } 

  getFileReplacements() {
    let docs = document.getElementById('doc') as HTMLInputElement;
    let reader = new FileReader();
    let str = '';
    let g = this.testObj;

    if(docs?.files == null) return null;
    if (docs.files!.length === 0) {
        alert("No files selected");
    }
    return new Observable<string[]>(observer => {
      reader.readAsBinaryString(docs.files!.item(0) as Blob);

      reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
      };

      reader.onload = function (evt) {
        const content: LoadData = evt.target!.result as LoadData;
        let zip = new PizZip(content);

        const InspectModule = require("docxtemplater/js/inspect-module");
        const iModule = InspectModule();
        const do2c = new Docxtemplater(zip, { modules: [iModule] });
        const tags = iModule.getAllTags();
        const tagsArr = Array.from(Object.keys(tags));
  
        observer.next(tagsArr)
      };
      })
  }

  generate() {
    let g = this.testObj
    let file = this.file;
    let reader = new FileReader();
    //let str = '';
    reader.readAsBinaryString(this.file as Blob);
    
    reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
    };
    reader.onload = function (evt) {
        const content: LoadData = evt.target!.result as LoadData;
        let zip = new PizZip(content);
        let doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        //wtfis
        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
 
        doc.render(g);
        let blob = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          
            compression: "DEFLATE",
        });
       
        
        //saveAs(blob, "output.docx");
        // Output the document using Data-URI
    };
    //this.teststr = str;
  }


}
