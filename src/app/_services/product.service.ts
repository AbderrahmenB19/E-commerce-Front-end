import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publicDecrypt } from 'crypto';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http:HttpClient) { }
  public addProduct(product:any){
    return this.http.post("http://localhost:9090/product/addNewProduct",product);
  }
}
