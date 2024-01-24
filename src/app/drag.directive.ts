import { Directive, HostBinding, HostListener, Output, Sanitizer } from '@angular/core';

import { FileHandle } from './_model/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files:EventEmitter<FileHandle>= new EventEmitter();

  constructor(private sanitaizer:DomSanitizer) { }
  @HostBinding("style.background")private background ="#eee"
  @HostListener("dragover",["$event"])
  public onDragOver(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#999";
    
  }
  @HostListener("dragover",["$event"])
  public onDragLeave(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
  
  }
  @HostListener("drop",["$event"])

  public onDrop(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
    let fileHandle:FileHandle|null=null;
    const file =evt.dataTransfer!.files[0];
    const url = this.sanitaizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    fileHandle={file,url};
    this.files.emit(fileHandle);


  }

}
