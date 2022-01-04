import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'travel-log-sidenav-list',
  template: `
    <mat-nav-list>
      <ng-container *ngFor="let sideNavItem of sideNavItems">
        <a
          mat-list-item
          [attr.aria-label]="sideNavItem.aria_label"
          [routerLink]="sideNavItem.route"
          (click)="onCloseSideNav()"
        >
          <mat-icon>{{ sideNavItem.material_icon }}</mat-icon>
          <span>{{ sideNavItem.text }}</span>
        </a>
      </ng-container>
      <mat-divider></mat-divider>
      <a
        mat-list-item
        aria-label="Icon-button with logout icon"
        class="logout-button"
        (click)="onLogout()"
      >
        <mat-icon>logout</mat-icon><span>Logout</span>
      </a>
    </mat-nav-list>
  `,
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  sideNavItems = [
    // {
    //   aria_label: 'Icon-button with login icon',
    //   route: '/',
    //   material_icon: 'home',
    //   text: 'Home',
    // },
    {
      aria_label: 'Icon-button with plane landing icon',
      route: '/all-trips',
      material_icon: 'flight_land',
      text: 'All trips',
    },
    {
      aria_label: 'Icon-button with plane taking off icon',
      route: '/add-trip',
      material_icon: 'flight_takeoff',
      text: 'Add new trip',
    },
  ];
  constructor(public authService: AuthService) {}

  onCloseSideNav() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.closeSideNav.emit();
    this.authService.logOut();
  }
}
