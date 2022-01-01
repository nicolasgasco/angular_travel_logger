import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-spinner',
  template: `<div>
    <mat-spinner></mat-spinner>
  </div>`,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
