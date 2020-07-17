import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.clientUrl}`);
  }

  public getClient(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.clientUrl}/${clientId}`);
  }

  public saveClient(id: number, name: string, email: string, password: string): Observable<any> {
    if (id) {
      return this.http.patch(`${environment.apiUrl}/clients/${id}`, { name, email, password });
    } else {
      return this.http.post(`${environment.apiUrl}/clients`, { name, email, password });
    }
  }

  public removeClient(clientId: number) {
    return this.http.delete(`${this.clientUrl}/${clientId}`);
  }
}
