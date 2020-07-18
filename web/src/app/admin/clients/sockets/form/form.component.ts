import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public operation: string;
  public socketForm: FormGroup;
  public socketLoading: boolean;
  public socketLoaded: boolean;
  public clientId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
