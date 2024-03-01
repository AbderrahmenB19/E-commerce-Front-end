import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ProductService } from "./product.service";
import { ImageProcessingService } from "./image-processing.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Product } from "../_model/product.model";

export const buyProductRrsolverService: ResolveFn<any> = (router: ActivatedRouteSnapshot) => {
  const check = router.paramMap.get("isSingleProductCheckout");
  const ID = router.paramMap.get('id');
  const imageProcessingService = inject(ImageProcessingService);
  const productService = inject(ProductService);


  return productService.getProductDetails(check == "true", Number(ID)).pipe(
    map((response: any) => { 
      
      if (!response ) {
        throw new Error('Product details not found');
      }
      console.log(response)
      return (response as Product[]).map((product: Product) => imageProcessingService.createImages(product));
    }),
    catchError((error: any) => {
      console.error('Error fetching product details:', error);
      return of([]);
    })
  );
};
