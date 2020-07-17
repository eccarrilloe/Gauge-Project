import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Socket } from '../classes/socket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socketsUrl = `${environment.apiUrl}/clients/{clientId}/sockets`;

  constructor(private http: HttpClient) { }

  public getSocketsByClientId(clientId: number): Observable<Socket[]> {
    const socketUrl = this.socketsUrl.replace('{clientId}', clientId.toString())
    return this.http.get<Socket[]>(socketUrl);
  }
}
