import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document, private render: Renderer2 ) { }

  ngOnInit(): void {
    this.render.addClass(document.body, 'login-page');
    this.render.removeClass(document.body, 'layout-top-nav');
  }

}
