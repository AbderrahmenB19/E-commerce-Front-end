import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    productActualPrice:0

  }
  constructor(private prodService:ProductService){}
  public addNewProduct(productFrom:NgForm){
    console.log(productFrom);
    console.log(productFrom.value)
    this.prodService.addProduct(productFrom.value).subscribe({
      next:(resp) => console.log(resp),
      error:(er:HttpErrorResponse)=>console.log(er)
    });

  }

}
