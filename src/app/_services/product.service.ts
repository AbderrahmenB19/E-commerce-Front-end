import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_PATH="http://localhost:9090/product/";
  

  constructor(private http:HttpClient) { }
  public addProduct(product:FormData){
    return this.http.post(this.API_PATH+"addNewProduct",product);
  }
  public getAllProduct(){
    return this.http.get(this.API_PATH+"getAllProduct")
  }
  public deletProduct(productId:number){
    return this.http.delete(this.API_PATH+`deleteProduct/${productId}`)
  }
  public getProductDetailsById(id:number){
    return this.http.get(this.API_PATH+`getProductDetailsById/${id}`)
  }
 
}
