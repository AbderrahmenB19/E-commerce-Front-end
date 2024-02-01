import { FileHandle } from "./file-handle";

export interface Product{
     productId:number|null;
     productName:string;
     productDescription:string;
     productDiscount:number ;
     productActualPrice:number;
     productImages:FileHandle[];
}