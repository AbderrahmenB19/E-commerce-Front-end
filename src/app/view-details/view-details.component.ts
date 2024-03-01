import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit {
  selctedIndex=0;
  
  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductService){}
  data:Product|undefined;
  ngOnInit(): void {
    this.data= this.route.snapshot.data["viewDetails"]
    console.log(this.data)
  }
  onChangeIndex(index:number){
    this.selctedIndex=index;
  }
  buyNow(id:number|null){

    this.router.navigate(['/buy',{isSingleProductCheckout:true,id:id}])
  }
  addToCart(productId:number|null){
    this.productService.addToCart(productId!).subscribe({
      next:resp=> console.log(resp),
      error:err=>console.log(err)
    })

  }
  
  

}
