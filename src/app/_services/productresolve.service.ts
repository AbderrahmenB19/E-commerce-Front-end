import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { map, of } from 'rxjs';

import { ProductService } from './product.service';
import { inject } from '@angular/core';
import { ImageProcessingService } from './image-processing.service';




export const productResolver: ResolveFn<any>=(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 
    const productId = route.paramMap.get("productId");
    const productService=inject(ProductService)
    const imageProcessingService=inject(ImageProcessingService)
    if (productId) {
      return productService.getProductDetailsById(Number(productId)).pipe(map((p:object)=> imageProcessingService.createImages(p)));
    } else {
      return of({
        productName:"",
        productDescription:"",
        productDiscount:0,
        productActualPrice:0,
        productImages:[]
    
      }); // Return an empty Observable
    }
  };