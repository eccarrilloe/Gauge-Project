import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Client } from '@app/shared/classes/client';
import { ClientService } from '@app/shared/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public operation: string;
  public clientForm: FormGroup;
  public clientLoading: boolean;
  public clientLoaded: boolean;
  public clientId: number;
  private client: Client;

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private toastr: ToastrService,
              private location: Location) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

    this.clientLoading = true;
    this.clientLoaded = false;

    this.activeRoute.params.subscribe((params) => {
      if (params.id) {
        this.clientId = params.id;
        this.operation = 'Edit';

        this.clientService.getClient(this.clientId).subscribe((client: Client) => {
          this.client = client;
          this.clientForm.controls.id.setValue(this.client.id);
          this.clientForm.controls.name.setValue(this.client.name);
          this.clientForm.controls.email.setValue(this.client.email);

          this.clientLoading = false;
          this.clientLoaded = true;
        });
      } else {
        this.clientForm.controls.password.setValidators([Validators.required]);
        this.operation = 'Create';
        this.clientLoading = false;
        this.clientLoaded = true;
      }
    });
  }

  private checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  public goToList() {
    return this.location.back();
  }

  public saveClient() {
    let { id, name, email, password, confirmPassword } = this.clientForm.value;
    id = id || undefined;

    this.clientService.saveClient(id, name, email, password).subscribe((result) => {
      this.toastr.success('Client saved successfully', 'Client saved');
      this.router.navigate(['admin', 'clients']);
    });
  }

}
