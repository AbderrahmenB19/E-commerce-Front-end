import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  constructor(public userService:UserService,  private userAuthService:UserAuthService, private router:Router){}
  ngOnInit(): void {
    
  }
  public Role(s:string[]){
    return this.userService.roleMatch(s);
  }
  
  public isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  } public logout(){
    this.userAuthService.clear();
    this.router.navigate(["/"]);
    

  } 
  public isAdmin():boolean{
    return this.userAuthService.isAdmin();
  } public isUser():boolean{
    return this.userAuthService.isUser();
  }
 


}
