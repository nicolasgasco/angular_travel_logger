import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
            <mat-error *ngIf="emailInput.hasError('required'); else otherError"
              >Cannot be empty</mat-error
            >
            <ng-template #otherError
              ><mat-error *ngIf="emailInput.invalid"
                >Email is invalid</mat-error
              ></ng-template
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
            <!-- Empty error -->
            <mat-error
              *ngIf="
                emailInputRepeat.hasError('required');
                else invalidEmailRepeat
              "
              >Cannot be empty</mat-error
            >
            <!-- Invalid error -->
            <ng-template #invalidEmailRepeat>
              <mat-error *ngIf="emailInputRepeat.invalid"
                >Email is invalid</mat-error
              >
            </ng-template>
            <!-- Password don't match -->
            <!-- <mat-error *ngIf="emailInputRepeat.value !== emailInput.value"
              >Emails don't match!</mat-error
            > -->
          </mat-form-field>

          <mat-form-field>
            <input
              matInput
              ngModel
              [type]="'password'"
              name="password"
              id="password"
              required
              minlength="8"
              #pwdInput="ngModel"
            />
            <mat-placeholder class="placeholder">Your password</mat-placeholder>
            <mat-hint align="end">{{ pwdInput.value?.length || 0 }}</mat-hint>
            <!-- Empty error -->
            <mat-error *ngIf="pwdInput.hasError('required')"
              >Cannot be empty</mat-error
            >
            <!-- Length error -->
            <mat-error *ngIf="pwdInput.errors?.['minlength']"
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
            <mat-hint align="end">{{
              pwdInputRepeat.value?.length || 0
            }}</mat-hint>
            <!-- Empty error -->
            <mat-error *ngIf="pwdInputRepeat.hasError('required')"
              >Cannot be empty</mat-error
            >
            <!-- Length error -->
            <mat-error *ngIf="pwdInputRepeat.errors?.['minlength']"
              >Should be at least 8 characters long</mat-error
            >
            <!-- <mat-error
              *ngIf="
                pwdInputRepeat.valid && pwdInputRepeat.value !== pwdInput.value
              "
              >Passwords don't match!</mat-error
            > -->
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
  @ViewChild('loginForm', { read: NgForm }) signupForm: NgForm;

  constructor(private authService: AuthService) {}

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
