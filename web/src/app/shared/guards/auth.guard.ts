import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      if (!this.authService.isAuth()) {
        this.router.navigate(['auth']);
        this.toastr.warning('Para entrar al sistema debe iniciar sesión', 'Inicio de Sesión Requerido');
        return false;
      }

      return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return true;
      if (!this.authService.isAuth()) {
        this.router.navigate(['auth']);
        this.toastr.warning('Para entrar al sistema debe iniciar sesión', 'Inicio de Sesión Requerido');
        return false;
      }

      return true;
  }
}
