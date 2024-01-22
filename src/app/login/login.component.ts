import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { HttpHandler } from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { login } from './login';
import { register } from './register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router:Router,private userService:UserService ,private userAuth :UserAuthService){}
  public  showRegisterForm =true;
  public loginF:login|undefined;
  public regirsterF:register|undefined;
  ngOnInit(): void {
   
  }
  login(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe({
      next: (resp:any)=> {
        
        this.userAuth.setToken(resp.accessToken);
        this.userAuth.setRoles(resp.roles);
        console.log(resp.roles[0])
        const role=resp.roles[0];
        if (role["id"] ===2){
          this.router.navigate(["/admin"]);

        }else{
          this.router.navigate(["/user"]);
        }
      },
      error:(eror:HttpHandler)=>console.log(eror),
    }
     
    );
  }
  toggleForms(){
    this.showRegisterForm=!this.showRegisterForm;
  }
  register(f:NgForm){
    this.userService.register(f.value).subscribe({
      next:r=> console.log(r),
      error:err=>console.log(err)
    });
    

  }
 

}
