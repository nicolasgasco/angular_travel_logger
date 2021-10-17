import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() progressBarCondition: boolean = false;
  @Input() title: string = '';
  @Input() icon: string = '';
  constructor() {}

  ngOnInit(): void {}
}
