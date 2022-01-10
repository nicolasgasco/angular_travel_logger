import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'travel-log-header',
  template: `
    <!-- Toolbar mobile -->
    <div
      fxLayout
      fxHide.gt-xs
      fxLayoutAlign="flex-start center"
      id="mobile-header"
    >
      <button
        *ngIf="authService.isAuthenticated"
        mat-icon-button
        class="burger-menu"
        aria-label="Icon-button with menu icon"
        (click)="onToggleSideNav()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span class="logo">TravelHero</span>
      <button
        *ngIf="!authService.isAuthenticated"
        mat-icon-button
        aria-label="Icon-button with login icon"
        class="login-button"
        routerLink="login"
      >
        <mat-icon>login</mat-icon>
      </button>
    </div>
    <!-- Toolbar desktop -->
    <div
      fxLayout
      fxHide.lt-sm
      fxLayoutAlign="space-between baseline"
      id="desktop-header"
      class="max-container"
    >
      <!-- Bigger screens -->
      <div fxLayout class="header-texts">
        <a
          [routerLink]="authService.isAuthenticated ? 'all-trips' : '/'"
          class="logo"
          >TravelHero</a
        >
        <!-- Disappears on tablets -->
        <span fxHide.lt-md>Keep track of your globetrotting...</span>
      </div>

      <mat-nav-list
        fxLayoutGap="20px"
        fxLayoutAlign="center baseline"
        [disableRipple]="true"
      >
        <a
          mat-list-item
          [matMenuTriggerFor]="menu"
          *ngIf="authService.isAuthenticated"
        >
          Trips <mat-icon>arrow_drop_down</mat-icon>
        </a>
        <mat-menu #menu="matMenu" xPosition="before">
          <button mat-menu-item routerLink="all-trips">All trips</button>
          <button mat-menu-item routerLink="add-trip">New trip</button>
        </mat-menu>
        <mat-list-item>
          <ng-container *ngIf="!authService.isAuthenticated; else logged">
            <button
              mat-flat-button
              routerLink="login"
              class="auth-button"
              color="accent"
            >
              Login
            </button>
          </ng-container>

          <ng-template #logged>
            <button
              mat-flat-button
              class="auth-button"
              color="accent"
              routerLink="/"
              (click)="onLogout()"
            >
              Logout
            </button>
          </ng-template>
        </mat-list-item>
      </mat-nav-list>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
