import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivateChild {
  constructor(private userservice: UserserviceService) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      return this.userservice.isUser
    

  
}
CanActivate():any{
if(localStorage.getItem('user')) return true
}
 

}
