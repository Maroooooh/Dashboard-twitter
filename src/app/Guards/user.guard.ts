import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../Services/user-auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserAuthService);
  const router = inject(Router);
  if (userService.isUserLogged) {
    return true;
  } else {
    // alert('Please Login First');
    Swal.fire({
      title: "The Login",
      text: "PLZ , Login First",
      icon: "question"
    });
    router.navigate(['/login']);
    return false;
  }
};
