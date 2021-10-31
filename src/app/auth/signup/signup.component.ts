import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'travel-log-signup',
  template: `
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
          <mat-error *ngIf="pwdInput.hasError('required')"
            >Cannot be empty</mat-error
          >
          <mat-error *ngIf="pwdInput.value <= 7"
            >Should be at least 8 characters long</mat-error
          >
        </mat-form-field>
        <span>{{ pwdInput.value }}</span>
        <mat-form-field>
          <input
            matInput
            ngModel
            type="password"
            name="password-repeat"
            id="password-repeat"
            required
            minlength="8"
            #pwdInputRepeat="ngModel"
          />
          <mat-placeholder class="placeholder">Repeat password</mat-placeholder>
          <mat-error *ngIf="pwdInputRepeat.hasError('required')"
            >Cannot be empty</mat-error
          >
          <mat-error *ngIf="pwdInputRepeat.value !== pwdInput.value"
            >Passwords don't match!</mat-error
          >
        </mat-form-field>
        <button
          mat-raised-button
          type="submit"
          color="primary"
          [disabled]="signupForm.invalid"
        >
          Login
        </button>
      </form>
    </travel-log-card>
  `,
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  showPassword: boolean;
  constructor() {
    this.showPassword = false;
  }

  onSubmit(signupForm: NgForm) {
    console.log(signupForm);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log('mierda');
  }

  ngOnInit(): void {}
}
