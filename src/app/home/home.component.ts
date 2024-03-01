import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pageNumber:number=0;
  products: Product[]=[]
  showLoadButton =false;
  constructor(private route:Router,private productService:ProductService,private imageProcessingService:ImageProcessingService){}
  ngOnInit(): void {
    this.getAllProduct()
  }
  public getAllProduct(searchKey:String=""){
    this.productService.getAllProduct(this.pageNumber,searchKey)
    .pipe(
      map((products: Object): Product[] => 
        (products as Product[]).map((product: Product) => this.imageProcessingService.createImages(product))
      )
    )
    .subscribe({
      next:(resp:any)=>{
        console.log(resp);
        if(resp.length===12){
          this.showLoadButton=true;
        }else{
          this.showLoadButton=false
        }
        resp.forEach((x:any)=>this.products.push(x))
      },error:error=>console.log(error)
    })

  }
  fullDescriptionVisible = new Map<string, boolean>(); // Track visibility for each product

  showFullDescription( productId: string): void {
    this.fullDescriptionVisible.set(productId, !this.fullDescriptionVisible.get(productId) || false); // Toggle visibility
  }

  getDescriptionVisibility(productId: string): boolean {
    return this.fullDescriptionVisible.get(productId) || false; // Determine current visibility
  }
  viewDetails(element:Product){
    this.route.navigate(["/viewDetails",{productId:element.productId}])


  }
  LoadMore(){
    this.pageNumber+=1;
    this.getAllProduct();
  }
  search(keyword: any) {
    this.pageNumber=0;
    this.products=[];
    this.getAllProduct(keyword)



    
    console.log(keyword); 
  }
  
  

  



}
