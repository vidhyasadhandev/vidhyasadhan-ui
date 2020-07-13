import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../_services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authenticationService: AuthserviceService){

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
               // const user = this.authenticationService.userValue;
                return true;
                // if (user) {
                //     return true;
                // } else {
                //     this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
                //     return false;
                // }
  }

}
