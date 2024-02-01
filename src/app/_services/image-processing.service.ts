import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';


import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle';


@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitaizer:DomSanitizer) { }
  public createImages(product:any)
  {
    const productImages:any[]=product.productImages;
    const productImagesToFileHandle:FileHandle[]=[]
    for(let i=0 ;i<productImages.length;i++){
      const imageFileData=productImages[i]
      const ImageToblob =this.dataUrlTobLob(imageFileData.picByte,imageFileData.type);
      const f =new File([ImageToblob],imageFileData.name,{type:imageFileData.type});
      const finalFileHadel:FileHandle={
        file:f,
        url:this.sanitaizer.bypassSecurityTrustUrl(window.URL.createObjectURL(f))
      };
      productImagesToFileHandle.push(finalFileHadel)
    }
    product.productImages=productImagesToFileHandle;
    return product;
    
  }
  public dataUrlTobLob(picByte:any, imageType:any){
    const byteString =window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intBArray = new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      intBArray[i]=byteString.charCodeAt(i);
    }
    return new Blob([intBArray],{type:imageType});
      
  }
}
