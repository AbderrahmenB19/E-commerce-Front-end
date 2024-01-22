import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  public setRoles(roles: []): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }

  public getRoles(): [] | null {
    if (this.isLocalStorageAvailable()) {
      const rolesString = localStorage.getItem("roles");
      return rolesString ? JSON.parse(rolesString) : null;
    }
    return null;
  }

  public setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem("jwtToken", token);
    }
  }

  public getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem("jwtToken");
    }
    return null;
  }

  public clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getRoles();
  }
  public isAdmin(){
    const roles :any=this.getRoles();
    console.log(roles);
    return roles[0].name==="ADMIN"

  }
  public isUser(){
    const roles :any=this.getRoles();
    console.log(roles);
    return roles[0].name==="USER"


  }
}
