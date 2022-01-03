import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <travel-log-header
        (sidenavToggle)="sidenav.toggle()"
      ></travel-log-header>
    </mat-toolbar>
    <!-- Sidenav -->
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
export class AppComponent implements OnInit {
  title = 'travel-logger';
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.initAuthListener();
  }
}
