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
    <ng-container *ngIf="isMobile; else desktop">
      <!-- Toolbar mobile -->
      <div fxLayout fxLayoutAlign="flex-start center" id="mobile-header">
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
        <ng-container *ngIf="!isAuth; else loggedMobile">
          <button
            mat-icon-button
            aria-label="Icon-button with login icon"
            class="login-button"
            routerLink="login"
          >
            <mat-icon>login</mat-icon>
          </button>
        </ng-container>
        <ng-template #loggedMobile>
          <button
            mat-icon-button
            aria-label="Icon-button with logout icon"
            class="logout-button"
            (click)="onLogout()"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </ng-template>
      </div></ng-container
    >
    <ng-template #desktop>
      <!-- Toolbar desktop -->
      <div fxLayout fxLayoutAlign="space-between baseline" id="desktop-header" class="max-container">
        <!-- Bigger screens -->
        <div fxLayout class="header-texts">
          <a [routerLink]="'/'" class="logo">TravelHero</a>
          <!-- Disappears on tablets -->
          <span fxHide.lt-md>Keep track of your globetrotting...</span>
        </div>

        <mat-nav-list fxLayoutGap="20px" fxLayoutAlign="center baseline">
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
            <ng-container *ngIf="!isAuth; else logged">
              <a
                mat-flat-button
                routerLink="login"
                class="auth-button"
                color="accent"
              >
                Login
              </a>
            </ng-container>

            <ng-template #logged>
              <a
                mat-flat-button
                class="auth-button"
                color="accent"
                routerLink="/"
                (click)="onLogout()"
              >
                Logout
              </a>
            </ng-template>
          </mat-list-item>
        </mat-nav-list>
      </div>
    </ng-template>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isMobile?: boolean;
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

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
