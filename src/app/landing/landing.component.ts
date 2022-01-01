import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-landing',
  template: `
    <section>
      <div
        class="paragraph-container"
        fxLayout.lt-md="column"
        fxLayoutAlign.lt-md="center"
        fxLayout.gt-md="row"
        fxLayoutAlign.gt-md="space-between center"
        fxLayoutGap.gt-md="60px"
        *ngFor="let literal of landingLiterals; index as i"
      >
        <div
          class="text-container"
          [class.left]="(i + 1) % 2 !== 0"
          [class.right]="(i + 1) % 2 === 0"
        >
          <h1 class="h1">{{ literal.title }}</h1>
          <p>
            {{ literal.text }}
          </p>
          <button
            mat-raised-button
            color="accent"
            fill="outline"
            [routerLink]="literal.button ? literal.button.link : ''"
            *ngIf="!!literal.button"
          >
            {{ literal.button.text }}
          </button>
        </div>
        <img
          [src]="literal.img"
          alt=""
          *ngIf="literal.img"
          [class.even]="(i + 1) % 2 === 0"
        />
      </div>
    </section>
  `,
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  landingLiterals = [
    {
      title: 'All your trips in one place',
      text: 'Jot down all your trip notes and treasure those precious moments forever.',
      img: '/assets/img/landing_adventure.svg',
    },
    {
      title: 'Sort, filter, and organize your trips',
      text: 'Keeping track of all your adventures has never been easier.',
      img: '/assets/img/landing_stats.svg',
    },
    {
      title: 'Start logging your trips now',
      text: 'Create a free account and write your own story.',
      button: {
        text: 'Log in',
        link: '/login',
      },
    },
  ];
  ngOnInit(): void {}
}
