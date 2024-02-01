import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
if (req.headers.get("No-auth")==="True"){
  return next(req)
}
const fb=inject(UserAuthService)
const token = fb.getToken();
const newReq = req.clone({
  setHeaders:{
    Authorization : `Bearer ${token}`
  } })
  return next(newReq);
  
}
