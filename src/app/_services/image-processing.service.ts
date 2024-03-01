import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../_model/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object) { }

  public createImages(product: any) {
    const productImages: any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];

    if (isPlatformBrowser(this.platformId)) {
      for (let i = 0; i < productImages.length; i++) {
        const imageFileData = productImages[i];
        const ImageToblob = this.dataUrlToBlob(imageFileData.picByte, imageFileData.type);
        const f = new File([ImageToblob], imageFileData.name, { type: imageFileData.type });
        const finalFileHandle: FileHandle = {
          file: f,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(f))
        };
        productImagesToFileHandle.push(finalFileHandle);
      }
      product.productImages = productImagesToFileHandle;
    }

    return product;
  }

  private dataUrlToBlob(picByte: any, imageType: any) {
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intBArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intBArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intBArray], { type: imageType });
  }
}
