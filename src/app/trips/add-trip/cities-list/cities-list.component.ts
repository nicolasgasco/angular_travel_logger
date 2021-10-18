import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent implements OnInit {
  @Input() cities: string = '';
  citiesList: string[];
  constructor() {
    this.citiesList = this.cities.split(',').map((city) => city.trim());
  }
  ngOnInit(): void {
    console.log(this.citiesList);
  }
}
