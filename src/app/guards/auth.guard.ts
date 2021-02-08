import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router){}

  // tslint:disable-next-line:typedef
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      const resp = this.userService.validateToken();
      if(resp){
        return true;
      } else {
        this.router.navigateByUrl('/login');
      }
  }

}
