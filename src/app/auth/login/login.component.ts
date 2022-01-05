import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'travel-log-login',
  template: `
    <section class="login-section">
      <travel-log-card
        [progressBarCondition]="
          loginForm.submitted && loginForm.form.status === 'VALID'
        "
        title="Log into your account"
        icon="login"
        class="login-card"
      >
        <form
          fxLayout="column"
          fxLayoutGap="25px"
          #loginForm="ngForm"
          (submit)="onSubmit()"
        >
          <mat-form-field>
            <mat-placeholder class="placeholder">Your email</mat-placeholder>
            <input
              matInput
              ngModel
              type="email"
              name="email"
              id="email"
              email
              #emailInput="ngModel"
              required
            />
            <mat-error *ngIf="emailInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <mat-error *ngIf="!emailInput.hasError('required')"
              >Email is invalid</mat-error
            >
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              ngModel
              [type]="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              required
              minlength="8"
              #pwdInput="ngModel"
            />
            <!-- Toggle password visiblity -->
            <mat-icon
              *ngIf="pwdInput.dirty"
              aria-hidden="false"
              aria-label="showPassword ? 'Hide password' : 'Show password'"
              class="visibility-icon"
              (click)="togglePassword()"
              >{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon
            >
            <mat-placeholder class="placeholder">Your password</mat-placeholder>
            <mat-hint align="end">{{ pwdInput.value?.length || 0 }}</mat-hint>
            <mat-error *ngIf="pwdInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <mat-error *ngIf="!pwdInput.hasError('required')"
              >Should be at least 8 characters long</mat-error
            >
          </mat-form-field>
          <button
            mat-raised-button
            type="submit"
            color="accent"
            [disabled]="loginForm.invalid"
          >
            Log in
          </button>
        </form>
        <button
          mat-raised-button
          color="primary"
          class="login-test"
          (click)="loginWithTestAccount()"
        >
          Log in with preview account
        </button>
      </travel-log-card>
      <div
        class="signup-text"
        fxHide.gt-sm
        fxLayout="column"
        fxLayoutAlign="center"
        fxLayoutGap="25px"
      >
        <p>Are you new here?</p>
        <button mat-raised-button routerLink="/signup" color="accent">
          Sign up
        </button>
      </div>
      <div fxHide.lt-md class="signup-text">
        <p>
          Are you new here?
          <a routerLink="/signup" color="accent">Sign up</a> instead.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { read: NgForm }) loginForm: NgForm;
  showPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  togglePassword = () => {
    this.showPassword = !this.showPassword;
  };

  loginWithTestAccount = () => {
    console.log('Loggin in with test account');
    this.authService.login(
      {
        email: 'test@test.com',
        password: 'TestTest2021',
      },
      this.loginForm
    );
  };

  onSubmit = () => {
    this.authService.login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
      this.loginForm
    );
  };
}
