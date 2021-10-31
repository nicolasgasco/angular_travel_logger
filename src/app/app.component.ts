import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <!-- Mobile tootbar -->
      <travel-log-header
        [isMobile]="true"
        fxHide.gt-xs
        (sidenavToggle)="sidenav.toggle()"
      ></travel-log-header>
      <!-- Desktop toolbar -->
      <travel-log-header [isMobile]="false" fxHide.lt-sm></travel-log-header>
    </mat-toolbar>
    <mat-sidenav-container class="sidenav-layout">
      <mat-sidenav opened="false" #sidenav role="navigation" fxHide.gt-xs>
        <travel-log-sidenav-list
          (closeSideNav)="sidenav.close()"
        ></travel-log-sidenav-list>
        <mat-divider></mat-divider>
        <travel-log-footer></travel-log-footer>
      </mat-sidenav>
      <mat-sidenav-content>
        <main><router-outlet></router-outlet></main>
        <travel-log-footer fxHide.lt-sm></travel-log-footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'travel-logger';
}
