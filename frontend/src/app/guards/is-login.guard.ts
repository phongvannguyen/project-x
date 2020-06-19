import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    return this.userService.userProfile$
    .pipe(
      map((userProfile) => {
        if (!!userProfile) {
          return true;
        } else {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
