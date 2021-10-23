import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'travel-log-header',
  template: `
    <ng-container *ngIf="isMobile; else desktop">
      <!-- Toolbar mobile -->
      <div fxLayout fxLayoutAlign="flex-start center">
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
      <div fxLayout fxLayoutAlign="space-between baseline">
        <div fxLayout>
          <a [routerLink]="'/'">TravelHero</a>
          <h1>Keep track of your globetrotting...</h1>
        </div>
        <nav fxLayoutGap="20px">
          <a>All trips</a>
          <a routerLink="add-trip">New trip</a>
          <button
            mat-raised-button
            routerLink="login"
            class="login-button"
            color="accent"
          >
            Login
          </button>
        </nav>
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
