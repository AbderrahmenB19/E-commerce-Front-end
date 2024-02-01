import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle';
import { ActivatedRoute } from '@angular/router';
import { productResolver } from '../_services/productresolve.service';

@Component({ 
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit {
  isNewProduct=true;
  product:Product ={
    productId:null,

    productName:"",
    productDescription:"",
    productDiscount:0,
    productActualPrice:0,
    productImages:[]

  }
  constructor(private activatedRoute:ActivatedRoute,private prodService:ProductService, private sanitaizer:DomSanitizer){}
  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data["product"];
    if(this.product && this.product.productId){
      this.isNewProduct=false;
    }
    
  }
  public addNewProduct(productFrom:NgForm){
    const productData= this.prepareFormData(this.product);
    this.prodService.addProduct(productData).subscribe({
      next:(resp) => console.log(resp),
      error:(er:HttpErrorResponse)=>console.log(er)
    });
    this.product={
      productId:null,
      productName:"",
      productDescription:"",
      productDiscount:0,
      productActualPrice:0,
      productImages:[]
  
    }
    


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
  onRemoveImages(i:number){
    this.product.productImages.splice(i,1)

    
  }
  fileDropped(event:any){
    this.product.productImages.push(event);
  }

}
