import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'travel-log-signup',
  template: `
    <section>
      <travel-log-card
        [progressBarCondition]="
          signupForm.submitted && signupForm.form.status === 'VALID'
        "
        title="Create a new account"
        icon="account_circle"
        class="signup-card"
      >
        <form
          fxLayout="column"
          fxLayoutGap="25px"
          #signupForm="ngForm"
          (ngSubmit)="onSubmit(signupForm)"
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
            <mat-error
              *ngIf="emailInput.touched && emailInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <mat-error
              *ngIf="
                emailInput.touched &&
                !emailInput.hasError('required') &&
                emailInput.status == 'INVALID'
              "
              >Email is invalid</mat-error
            >
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              ngModel
              type="email"
              name="email_repeat"
              id="email_repeat"
              email
              required
              #emailInputRepeat="ngModel"
            />
            <mat-placeholder class="placeholder">Repeat email</mat-placeholder>
            <mat-error
              *ngIf="emailInput.touched && emailInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <ng-template #otherError>
              <mat-error
                *ngIf="
                  emailInputRepeat.touched &&
                  emailInputRepeat.value !== emailInput.value
                "
                >Emails don't match!</mat-error
              ></ng-template
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
            <ng-container *ngIf="pwdInput.dirty">
              <button
                mat-icon-button
                aria-hidden="false"
                aria-label="showPassword ? 'Hide password' : 'Show password'"
                class="visibility-icon"
                (click)="togglePassword()"
              >
                <mat-icon>{{
                  showPassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
            </ng-container>
            <mat-placeholder class="placeholder">Your password</mat-placeholder>
            <mat-hint align="end">{{ pwdInput.value?.length || 0 }}</mat-hint>
            <mat-error *ngIf="emailInput.dirty && pwdInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <mat-error *ngIf="pwdInput.value <= 7"
              >Should be at least 8 characters long</mat-error
            >
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              ngModel
              type="password"
              name="password_repeat"
              id="password_repeat"
              required
              minlength="8"
              #pwdInputRepeat="ngModel"
            />
            <mat-placeholder class="placeholder"
              >Repeat password</mat-placeholder
            >
            <mat-error
              *ngIf="
                pwdInputRepeat.dirty && pwdInputRepeat.hasError('required');
                else otherError
              "
              >Cannot be empty</mat-error
            >
            <ng-template #otherError>
              <mat-error
                *ngIf="
                  pwdInputRepeat.dirty &&
                  pwdInputRepeat.value !== pwdInput.value
                "
                >Passwords don't match!</mat-error
              ></ng-template
            >
          </mat-form-field>
          <button
            mat-raised-button
            type="submit"
            color="accent"
            [disabled]="signupForm.invalid"
          >
            Create account
          </button>
        </form>
      </travel-log-card>
    </section>
  `,
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  showPassword: boolean;
  @ViewChild('loginForm', { read: NgForm }) signupForm: NgForm;

  constructor(private authService: AuthService) {
    this.showPassword = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser(
      {
        email: form.value.email_repeat,
        password: form.value.password_repeat,
      },
      form
    );
  }

  ngOnInit(): void {}
}
