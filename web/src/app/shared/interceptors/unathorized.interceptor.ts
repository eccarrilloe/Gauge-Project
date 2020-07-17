import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class UnathorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.toastr.error('Su sesión ha caducado', 'Sesión expirada');
            this.router.navigate(['auth']);
            this.authService.logout();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
  }
}
