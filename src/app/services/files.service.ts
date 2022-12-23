import { Injectable, Input } from '@angular/core';
import Docxtemplater from 'docxtemplater';
import PizZip, { LoadData } from 'pizzip';
import { saveAs } from 'file-saver';
import { delay, lastValueFrom, max, Observable } from 'rxjs';
import { replacementInput } from '../interfaces/replacementInput';



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

    const file:File = target.files[0];

    if (file) {
      this.file = file;
      
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
      
      this.isUploaded = true;
      
      return;
    } 
  } 

  getFileReplacements() {
    let docs = document.getElementById('doc') as HTMLInputElement;
    let reader = new FileReader();
 
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

        try {
          console.log('here')
          const do2c = new Docxtemplater(zip, { modules: [iModule] });
          const tags = iModule.getAllTags();
          let tagsArr = Array.from(Object.keys(tags));
          observer.next(tagsArr)
          
        } catch(error) {
          console.log(error)
          observer.next(['-error'])
        }

      };
      })
  }

  generate() {
    let g = this.testObj
    let reader = new FileReader();
    reader.readAsBinaryString(this.file as Blob);
    
    reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
    };
    reader.onload = function (evt) {
        const content: LoadData = evt.target!.result as LoadData;
        let zip = new PizZip(content);
        try {
          let doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.render(g);
          let blob = doc.getZip().generate({
              type: "blob",
              mimeType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            
              compression: "DEFLATE",
          });
          saveAs(blob, "output.docx");
        }
          catch (error) {
            alert('something went wrong')
        }        
    };
  }

  generate2(replacementFields: replacementInput[]) {
    let skipReplacements = new Map();
    const fileName = this.fileName.split('.')[0];
    let reader = new FileReader();
    
    reader.readAsBinaryString(this.file as Blob);
    
    reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
    };
     reader.onload = function (evt) {
        const content: LoadData = evt.target!.result as LoadData;
        let zip = new PizZip(content);
        
        let replacements = zip.file('word/document.xml')!.asText();

        for(let i = 0; i < replacementFields.length; i++) {
          const state = replacementFields[i].state;
          let from = replacementFields[i].from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const to = replacementFields[i].to;
          if(from.includes('-')){
            from = from.split('-')[0];
          } 
          const regExGlobal = new RegExp(from, 'gi');
          const regEx = new RegExp(from, 'i');

          let isInSkips: any = null;

          if(to == '' && !skipReplacements.has(from)){
            let skipIndex: number = 0;
            const allSubstrs = [...replacements.matchAll(regExGlobal)].map(a => a.index);

            if(state == 'one') {
              skipIndex = (allSubstrs[0] || 0)  + from.length;
            }
            else if(state == 'all'){
              skipIndex = (replacements.lastIndexOf(from) || 0) + from.length;
            }
            else {
              const maxIndex = allSubstrs.length;
              const count = +state > maxIndex ? maxIndex : +state;
              
              skipIndex = (allSubstrs[count - 1] || 0) + from.length;
            }
            skipReplacements.set(from, skipIndex);
            continue;
          }

          if(to == '' && skipReplacements.has(from)){
            let skipIndex: number = 0;
            const mapSkipIndex = skipReplacements.get(from);

            const allSubstrs = [...replacements.matchAll(regExGlobal)].map(a => a.index).filter(a => {
              if(a != undefined &&  a > mapSkipIndex) return true;
              else return false;
            });
            if(state == 'one') {
              skipIndex = (allSubstrs[0] || 0)  + from.length;
            }
            else if(state == 'all'){
              skipIndex = replacements.lastIndexOf(from) + from.length;
            }
            else {         
              const maxIndex = allSubstrs.length;
              const count = +state > maxIndex ? maxIndex : +state;
              
              skipIndex = (allSubstrs[count - 1] || 0) + from.length;
            }
            skipReplacements.set(from, skipIndex);
            continue;
          }

          let replacement = '';
          if(skipReplacements.has(from)){
            isInSkips = skipReplacements.get(from);
          }
          if(isInSkips) {
            if(state == 'all') {
              replacement = replacements.slice(0, isInSkips) + replacements.slice(isInSkips).replaceAll(regExGlobal, `{${to}}`)
            } else if (state == 'one'){

              replacement = replacements.slice(0, isInSkips) + replacements.slice(isInSkips).replace(regEx, `{${to}}`)
            }  else {
              const maxIndex = [...replacements.matchAll(regExGlobal)].map(a => a.index).length;
              const count = +state > maxIndex ? maxIndex : +state;
              for(let i = 0; i < count; i++) {
                replacement = replacements.slice(0, isInSkips) + replacements.slice(isInSkips).replace(regEx, `{${to}}`)
                replacements = replacement;
              }
              
              replacements = replacement;
            }

          }

          if(!isInSkips) {

            if(state == 'all') {
              replacement = replacements.replaceAll(regExGlobal, `{${to}}`)
            } else if (state == 'one'){
              replacement = replacements.replace(regEx, `{${to}}`)
            } else {
              const maxIndex = [...replacements.matchAll(regExGlobal)].map(a => a.index).length;
              const count = +state > maxIndex ? maxIndex : +state;
              for(let i = 0; i < count; i++) {
                replacement = replacements.replace(regEx, `{${to}}`)
                replacements = replacement;
              }
            }
          }
          
          replacements = replacement;
        }

        zip.file('word/document.xml', replacements)

        const doc2 = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        const blob3 = doc2.getZip().generate({
          type: "blob",
          mimeType: 
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          
          compression: "DEFLATE",        
        });
        
        // Output the document using Data-URI
        saveAs(blob3, `${fileName}_template.docx`);
        // observer.next(blob)
    };
    
  }
}
