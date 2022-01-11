import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-card',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title class="card-title">
          <mat-icon
            fxLayout
            fxHide.lt-md
            mat-card-avatar
            aria-hidden="false"
            aria-label="Login icon"
            class="md-48"
            >{{ icon }}</mat-icon
          >{{ title }}</mat-card-title
        >
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-footer>
        <mat-progress-bar
          *ngIf="progressBarCondition"
          mode="indeterminate"
        ></mat-progress-bar
      ></mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() progressBarCondition: boolean = false;
  @Input() title: string = '';
  @Input() icon: string = '';
  constructor() {}

  ngOnInit(): void {}
}
