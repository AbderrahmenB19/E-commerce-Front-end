import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { orderDetails } from '../_model/order-details.model';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Route, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';

import { ConfirmationComponent } from '../confirmation/confirmation.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buyy',
  templateUrl: './buyy.component.html',
  styleUrl: './buyy.component.css'
})
export class BuyyComponent implements OnInit
{
  productDetails:Product[]=[];
  orderDetails:orderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContact: '',
    orderProductQuantities: []
  }
  constructor(private productService:ProductService,
     private activatedRoute :ActivatedRoute,
     private dialog:MatDialog){}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantities.push({productId:x.productId,productQuantity:1})
    );
    console.log(this.orderDetails);
    console.log(this.productDetails);
  }
  placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe({
      next:(response:any)=>{
        console.log(response);
        orderForm.reset;
        let dialogRef = this.dialog.open(ConfirmationComponent, {
          height: '200px',
          width: '300px',
        });
      },error:error=>console.log(error)
    })

  }
  public getQuantityForProduct(productId:Number|null){
    const filterProduct=this.orderDetails.orderProductQuantities.filter(
      (productQuantity)=> productQuantity.productId===productId
    )
    return filterProduct[0].productQuantity
  }
  getCalculateTotal(id:number|null,price:number){
    const filterproduct= this.orderDetails.orderProductQuantities.filter(
      (productQuntity)=> productQuntity.productId===id
    )
    return filterproduct[0].productQuantity * price;

  }
  onchangeQuantity(q:any,id:number|null){
    const filterproduct= this.orderDetails.orderProductQuantities.filter(
      (productQuntity)=> productQuntity.productId===id
    )
    filterproduct[0].productQuantity=q;

  } getCalculateGarandTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantities.forEach(
      element => {
        const price = this.productDetails.filter(
          (value) => value.productId === element.productId)[0].productDiscount;
          grandTotal+=price*element.productQuantity
      
        }
        
      

    )
    return grandTotal;
  }
  confirmation (){
   
  }


}



