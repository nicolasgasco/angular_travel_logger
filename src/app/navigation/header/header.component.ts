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
        <!-- Desktop version -->
        <div fxLayout class="header-texts">
          <a [routerLink]="'/'">TravelHero</a>
          <!-- Disappears on tablets -->
          <span fxHide.lt-md>Keep track of your globetrotting...</span>
        </div>

        <mat-nav-list fxLayoutGap="20px" fxLayoutAlign="center baseline">
          <a mat-list-item>All trips</a>
          <a mat-list-item routerLink="add-trip">New trip</a>
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
