import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'travel-log-header',
  template: `
    <ng-container *ngIf="isMobile; else desktop">
      <!-- Toolbar mobile -->
      <div fxLayout fxLayoutAlign="flex-start center" id="mobile-header">
        <button
          mat-icon-button
          aria-label="Icon-button with menu icon"
          (click)="onToggleSideNav()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>TravelHero</span>
        <button
          mat-icon-button
          aria-label="Icon-button with login icon"
          class="login-button"
          routerLink="login"
        >
          <mat-icon>login</mat-icon>
        </button>
      </div></ng-container
    >
    <ng-template #desktop>
      <!-- Toolbar desktop -->
      <div fxLayout fxLayoutAlign="space-between baseline" id="desktop-header">
        <!-- Bigger screens -->
        <div fxLayout class="header-texts">
          <a [routerLink]="'/'">TravelHero</a>
          <!-- Disappears on tablets -->
          <span fxHide.lt-md>Keep track of your globetrotting...</span>
        </div>

        <mat-nav-list fxLayoutGap="20px" fxLayoutAlign="center baseline">
          <a mat-list-item [matMenuTriggerFor]="menu">
            Trips <mat-icon>arrow_drop_down</mat-icon>
          </a>
          <mat-menu #menu="matMenu" xPosition="before">
            <button mat-menu-item routerLink="all-trips">All trips</button>
            <button mat-menu-item routerLink="add-trip">New trip</button>
          </mat-menu>
          <mat-list-item>
            <a routerLink="login" class="login-button" color="accent">
              Login
            </a>
          </mat-list-item>
        </mat-nav-list>
      </div>
    </ng-template>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMobile?: boolean;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }
}
