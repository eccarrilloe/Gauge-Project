import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../classes/client';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}/auth/`;
  private token: string;
  private client: Client;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.token = token;
      let clientData = sessionStorage.getItem('client');

      if (clientData) {
        this.client = new Client(JSON.parse(clientData));
      }
    }
  }

  public isAuth(): boolean {
    return this.token !== undefined && this.client !== undefined;
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl + 'login', { email, password }).pipe(
      map((response: any) => {
        this.client = new Client(response.client);
        this.token = response.token;
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('client', JSON.stringify(this.client));

        return true;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  public getClient(): Client {
    return this.client;
  }

  public getToken(): string {
    return this.token;
  }

  public logout(): Observable<boolean> {
    this.token = undefined;
    this.client  = undefined;
    sessionStorage.clear();

    return of(true);
  }
}
