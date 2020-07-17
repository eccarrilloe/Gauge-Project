import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document,
              private render: Renderer2,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.render.removeClass(document.body, 'login-page');
    this.render.addClass(document.body, 'layout-top-nav');
  }

  public getClient() {
    return this.authService.getClient();
  }

  public goToClients() {
    this.router.navigate(['admin', 'clients']);
  }

  public logout() {
    this.authService.logout().subscribe((response) => {
      if (response === true) {
        this.toastr.success('Sesión cerrada correctamente', 'Sesión Cerrada');
        this.router.navigate(['auth']);
      }
    });
  }

}
