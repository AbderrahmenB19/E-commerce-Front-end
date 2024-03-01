import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../_model/product.model';
import { orderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_PATH="http://localhost:9090/product/";
  API_PATH_ORDER="http://localhost:9090/order/";
  API_PATH_CART="http://localhost:9090/cart/";
  

  constructor(private http:HttpClient) { }
  public addProduct(product:FormData){
    return this.http.post(this.API_PATH+"addNewProduct",product);
  }
  public getAllProduct(pageNumber:Number,searchKey:String=""){
    return this.http.get(this.API_PATH+"getAllProduct?pageNumber="+pageNumber+"&searchKey="+searchKey)
  }
  public deletProduct(productId:number){
    return this.http.delete(this.API_PATH+`deleteProduct/${productId}`)
  }
  public getProductDetailsById(id:number){
    return this.http.get(this.API_PATH+`getProductDetailsById/${id}`)
  }
  public getProductDetails(isSingleProductCheckout:boolean,productId:Number){
    return this.http.get(this.API_PATH+`getProductDetails/${isSingleProductCheckout}/${productId}`)
  }
  public placeOrder(orderDetails:orderDetails){
    return this.http.post(this.API_PATH_ORDER+'placeOrder',orderDetails);
  }
  public addToCart(productId:number){
    return this.http.get(this.API_PATH_CART+"addToCart/"+productId);
  }
 
}
