
import { inject } from '@angular/core';
import {  ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';
import { map } from 'rxjs';

export const ViewDetailsResolver:ResolveFn<any>=(route:ActivatedRouteSnapshot)=>{
  const id =route.paramMap.get("productId");
  const imageProcessingService=inject(ImageProcessingService)

  return inject(ProductService).getProductDetailsById(Number(id)).pipe(map((x)=>imageProcessingService.createImages(x)))

}