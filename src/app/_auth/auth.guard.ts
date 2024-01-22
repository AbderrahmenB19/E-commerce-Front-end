import {
  inject
} from '@angular/core';
import {
  Router,
  CanActivateFn
} from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
 
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  const userService = inject(UserService);

  if (userAuthService.getToken() !== null) {
    const role = route.data['roles'] as Array<string>;

    if (role) {
      const match = userService.roleMatch(role);

      if (match) {
        return true; 
      } else {
        router.navigate(['/forbidden']);
        return false; 
      }
    }
  }

  router.navigate(['/login']);
  return false; 
};
