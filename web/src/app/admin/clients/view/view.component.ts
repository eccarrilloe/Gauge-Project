import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Client } from '@app/shared/classes/client';
import { ClientService } from '@app/shared/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '@app/shared/services/socket.service';
import { Socket } from '@app/shared/classes/socket';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public clientId: number;
  public client: Client;

  public clientLoading: boolean;
  public clientLoaded: boolean;
  public socketsLoading: boolean;
  public socketsLoaded: boolean;
  public showSocketForm: boolean;

  constructor(private clientService: ClientService,
              private socketsService: SocketService,
              private fb: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private toastr: ToastrService,
              private location: Location) { }

  ngOnInit(): void {
    this.clientLoading = true;
    this.clientLoaded = false;

    this.activeRoute.params.subscribe((params) => {
      this.clientId = params.clientId;

      this.clientService.getClient(this.clientId).subscribe((client: Client) => {
        this.client = new Client(client);
        this.clientLoading = false;
        this.clientLoaded = true;
      });
    });
  }

  public goToList() {
    return this.location.back();
  }

  public goToSocketsList() {
    return this.router.navigate(['admin', 'clients', 'view', this.clientId, 'sockets']);
  }

  public editClient() {
    return this.router.navigate(['admin', 'clients', 'edit', this.clientId]);
  }

}
