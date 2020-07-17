import { Component, OnInit } from '@angular/core';
import { ClientService } from '@app/shared/services/client.service';
import { Client } from '@app/shared/classes/client';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public clients: Client[];
  public clientsLoading: boolean;
  public clientsLoaded: boolean;

  constructor(private clientService: ClientService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.refreshClientsList();
  }

  public refreshClientsList() {
    this.clientsLoaded = false;
    this.clientsLoading = true;
    this.clients = [];

    this.clientService.getClients().subscribe((response) => {
      this.clients = response;
      this.clientsLoaded = true;
      this.clientsLoading = false;
    });
  }

  public newClient() {
    this.router.navigate(['admin', 'clients', 'create']);
  }

  public viewClient(client: Client) {
    this.router.navigate(['admin', 'clients', 'view', client.id]);
  }

  public editClient(client: Client) {
    this.router.navigate(['admin', 'clients', 'edit', client.id]);
  }

  public removeClient(client: Client) {
    if (!confirm('Are you sure you want to remove this client?')) {
      return;
    }

    this.clientService.removeClient(client.id).subscribe((response) => {
      this.toastr.success('Client removed successfully', 'Client removed');
      this.refreshClientsList();
    });
  }

}
