import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit {
  selctedIndex=0;
  
  constructor(private route:ActivatedRoute){}
  data:Product|undefined;
  ngOnInit(): void {
    this.data= this.route.snapshot.data["viewDetails"]
    console.log(this.data)
  }
  onChangeIndex(index:number){
    this.selctedIndex=index;
  }
  
  

}
