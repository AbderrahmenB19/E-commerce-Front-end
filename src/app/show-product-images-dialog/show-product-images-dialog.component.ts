import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css'
})
export class ShowProductImagesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  
}
