import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';


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
    path:"addNewProduct",component:AddNewProductComponent,canActivate:[authGuard], data:{roles:["ADMIN"]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
