import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userServices.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      telephoneNumber: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get registerFormFields() {
    return this.registerForm.controls;
  }

  get loginFormFields() {
    return this.loginForm.controls;
  }

  onRegisterSubmit() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.loading = true;
      this.userServices
        .register(
          this.registerFormFields.firstname.value,
          this.registerFormFields.lastname.value,
          this.registerFormFields.email.value,
          this.registerFormFields.password.value
        )
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  onLoginSubmit() {
    this.loading = true;
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.userServices
        .login(
          this.loginFormFields.email.value,
          this.loginFormFields.password.value
        )
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  loginWithGoogle() {
    this.loading = true;
    this.userServices.signInWithGoogle().subscribe(() => {
      this.loading = false;
    });
  }
}
