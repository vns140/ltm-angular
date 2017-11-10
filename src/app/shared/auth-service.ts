import {Injectable} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from "@angular/router";


@Injectable()
export class AuthService implements CanActivate{
  

    public token: string;
    public experies: string;
    //public route;
    public user;
    constructor(private router: Router,route: ActivatedRoute){

        this.token = localStorage.getItem('token');
        this.experies = localStorage.getItem('experies');
    }

      canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.token = localStorage.getItem('token');
        this.experies = localStorage.getItem('experies');
       if(!this.token){
            this.router.navigate(['/entrar']);
            return false;
       }
        return true;
    }

        
}