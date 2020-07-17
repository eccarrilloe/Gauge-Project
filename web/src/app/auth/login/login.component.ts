import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loggingIn: boolean;
  public loginMessage = 'Log in';

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login() {
    const { email, password } = this.loginForm.value;

    this.loggingIn = true;
    this.loginMessage = 'Loging in...';
    this.authService.login(email, password).subscribe((response) => {
      this.loggingIn = false;
      this.loginMessage = 'Log in';

      this.toastr.clear();
      if (response === true) {
        this.toastr.success('User logged', 'Login successful');
        this.router.navigate(['admin']);
      } else {
        this.toastr.error('Invalid User/Password', 'Invalid Credentials');
        this.loginForm.controls.password.setValue(null);
      }
    });
  }
}
