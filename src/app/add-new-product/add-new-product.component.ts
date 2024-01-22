import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle';

@Component({ 
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
  product:Product={
    productName:"",
    productDescription:"",
    productDiscount:0,
    productActualPrice:0,
    productImages:[]

  }
  constructor(private prodService:ProductService, private sanitaizer:DomSanitizer){}
  public addNewProduct(productFrom:NgForm){
    const productData= this.prepareFormData(this.product);
    this.prodService.addProduct(productData).subscribe({
      next:(resp) => console.log(resp),
      error:(er:HttpErrorResponse)=>console.log(er)
    });


  }
  prepareFormData(product:Product):FormData{
    const formData= new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    )
    for (var i =0 ;i<product.productImages.length;i++){
      formData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name 
      )

    }
    return formData;


  }
  onFileSlected(event:any){
    if(event.target.files){
      const file =event.target.files[0];
      const fileHandle:FileHandle={
        file:file,
        url:this.sanitaizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
      
    }

  }

}
