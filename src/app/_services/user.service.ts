import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { register } from '../login/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API ="http://localhost:9090/api/auth";
  requestHeader=new HttpHeaders({
    "No-Auth":"True"
  }
  );
  



  constructor(private http :HttpClient , private userAuthService:UserAuthService) { }
  public login(LoginData:any){
    return this.http.post(this.PATH_OF_API+ "/login",LoginData,{headers:this.requestHeader});
  }
  public register(register:any){
    return this.http.post(this.PATH_OF_API+"/register",register,{headers:this.requestHeader});
  }
  
  public roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.userAuthService.getRoles();
  
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) {
            return true; 
          }
        }
      }
    }
  
    return false; 
  }
  
  
}
