import { orderQuantity } from "./order-Quantity.model";

export interface orderDetails{
    fullName: string;
    fullAddress:string;
    contactNumber:string;
    alternateContact:string;
    orderProductQuantities:orderQuantity[];

}