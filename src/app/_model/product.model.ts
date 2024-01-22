import { FileHandle } from "./file-handle";

export interface Product{
     productName:string;
     productDescription:string;
     productDiscount:number ;
     productActualPrice:number;
     productImages:FileHandle[];
}