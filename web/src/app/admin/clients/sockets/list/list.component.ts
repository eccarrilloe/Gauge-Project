import { Component, OnInit } from '@angular/core';
import { Socket } from '@app/shared/classes/socket';
import { SocketService } from '@app/shared/services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public clientId: number;
  public sockets: Socket[];
  public socketsLoaded: boolean;
  public socketsLoading: boolean;

  constructor(private socketService: SocketService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.clientId) {
        this.clientId = params.clientId;
        this.refreshSocketsList();
      }
    });
  }

  public refreshSocketsList() {
    this.socketsLoaded = false;
    this.socketsLoading = true;

    this.socketService.getSocketsByClientId(this.clientId).subscribe((sockets: Socket[]) => {
      this.sockets = sockets;
      this.socketsLoaded = true;
      this.socketsLoading = false;
    });
  }

  public newSocket() {
    return this.router.navigate(['admin', 'clients', 'view', this.clientId, 'sockets', 'create'])
  }

  public viewSocket(socket: Socket) {
    return this.router.navigate(['admin', 'clients', 'view', this.clientId, 'sockets', 'view', socket.id])
  }

  public editSocket(socket: Socket) {
    return this.router.navigate(['admin', 'clients', 'view', this.clientId, 'sockets', 'edit', socket.id])
  }

  public removeSocket(socket: Socket) {
    if (!confirm('Are you sure you want to remove this socket and related gauges?')) {
      return;
    }

    this.socketService.removeSocket(this.clientId, socket.id).subscribe((response) => {
      this.toastr.success('Socket removed successfully', 'Socket removed');
    });
  }

}
