import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'travel-log-sidenav-list',
  template: `
    <mat-nav-list>
      <a
        *ngFor="let sideNavItem of sideNavItems"
        mat-list-item
        aria-label="sideNavItem.aria_label"
        [routerLink]="sideNavItem.route"
        (click)="onCloseSideNav()"
      >
        <mat-icon>{{ sideNavItem.material_icon }}</mat-icon>
        <span>{{ sideNavItem.text }}</span>
      </a>
    </mat-nav-list>
  `,
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  sideNavItems: {
    aria_label: string;
    material_icon: string;
    route: string;
    text: string;
  }[];

  constructor() {
    this.sideNavItems = [
      {
        aria_label: 'Icon-button with login icon',
        route: '/',
        material_icon: 'home',
        text: 'Home',
      },
      {
        aria_label: 'Icon-button with plane landing icon',
        route: '/trips',
        material_icon: 'flight_land',
        text: 'All trips',
      },
      {
        aria_label: 'Icon-button with plane taking off icon',
        route: '/new-trip',
        material_icon: 'flight_takeoff',
        text: 'Add new trip',
      },
    ];
  }

  onCloseSideNav() {
    this.closeSideNav.emit();
  }
}
