import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{
  
  products:Product[]|undefined
  displayedColumns: string[] = ['ID', 'Product name', 'Product Description', 'Product Actual Price', "Product Discount","Actions"];
  
  constructor(private productService:ProductService,private router:Router,
    private dialog: MatDialog, 
    private imageProcessingService:ImageProcessingService){}
  
  ngOnInit(): void {
    this.getAllProduct()
    

  }
  public getAllProduct(){
    this.productService.getAllProduct()
    .pipe(
      map((products: Object): Product[] => 
        (products as Product[]).map((product: Product) => this.imageProcessingService.createImages(product))
      )
    )
    .subscribe({
      next:(resp:any)=>{
        console.log(resp);
        this.products=resp;
      },error:error=>console.log(error)
    })

  }
  public onDeleteProduct(id:number){
    const result =confirm('Are u sure yo delete this product ?');
    if (result){
      this.productService.deletProduct(id).subscribe({
        next:resp=> console.log(resp),
        error:eror=>console.log(eror)
      })
    }

    
  }
  public onEditProduct(id:number){
    this.router.navigate(["/addNewProduct",{productId:id}],)

  }
  
  public onShowImages(elemnt:Product){
    let dialogRef = this.dialog.open(ShowProductImagesDialogComponent, {
      data:{images:elemnt.productImages},
      height: '400px',
      width: '800px',
    });

  }
  
}
