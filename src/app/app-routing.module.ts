import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { productResolver } from './_services/productresolve.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ViewDetailsResolver } from './_services/view-details-resolver.service';
import { BuyyComponent } from './buyy/buyy.component';
import { buyProductRrsolverService } from './_services/buy-product-se-resolver.service';


const routes: Routes = [
  {
    path:"",component:HomeComponent 
  },
  {
    path:"admin",component:AdminComponent ,canActivate:[authGuard],data:{roles:['ADMIN']}}
  ,{
    path:"user",component:UserComponent,canActivate:[authGuard],data:{roles:['USER']} }
  ,{
    path:"login", component:LoginComponent
  },{
    path:"forbidden",component:ForbiddenComponent
  },
  {
    path:"addNewProduct",component:AddNewProductComponent,canActivate:[authGuard], data:{roles:["ADMIN"]},resolve:{product:productResolver}
  
},{
  path:"showProduct", component:ShowProductDetailsComponent, canActivate:[authGuard], data:{roles:["ADMIN"]}
},{
  path:"viewDetails",component:ViewDetailsComponent,resolve:{viewDetails:ViewDetailsResolver}
},
{
  path:"buy",component:BuyyComponent,canActivate:[authGuard],resolve:{productDetails:buyProductRrsolverService},data:{roles:['USER','ADMIN']}
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
