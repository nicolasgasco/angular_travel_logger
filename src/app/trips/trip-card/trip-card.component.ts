import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TripData } from 'src/app/interfaces/trip-data.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-trip-card',
  template: `
    <mat-card id="trip-card">
      <mat-card-title>{{
        tripData.name
          ? capitalizeFirstLetter(tripData.name)
          : capitalizeFirstLetter(tripData.countries.join(', '))
      }}</mat-card-title>
      <mat-card-subtitle>
        {{
          tripData.dates.start.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }}
        <span *ngIf="tripData.dates.start !== tripData.dates.end">
          -
          {{
            tripData.dates.end.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }}</span
        >
      </mat-card-subtitle>
      <mat-card-content>
        <mat-tab-group>
          <!-- Countries tab  -->
          <mat-tab label="Countries">
            <div class="country-container">
              <ng-container
                *ngIf="tripData.countries.length > 0; else noCountriesToShow"
              >
                <mat-list role="list">
                  <mat-list-item
                    role="listitem"
                    *ngFor="let country of tripData.countries.sort()"
                  >
                    {{ capitalizeFirstLetter(country) }}
                    <mat-divider
                      *ngIf="tripData.countries.length > 1"
                    ></mat-divider>
                  </mat-list-item> </mat-list
              ></ng-container>
              <ng-template #noCountriesToShow>
                <p>There are no countries to show!</p>
              </ng-template>
            </div>
          </mat-tab>
          <!-- Cities tab -->
          <mat-tab label="Cities">
            <div class="city-container">
              <ng-container
                *ngIf="tripData.cities.length > 0; else noCitiesToShow"
              >
                <mat-list role="list">
                  <mat-list-item
                    role="listitem"
                    *ngFor="let city of tripData.cities.sort()"
                  >
                    {{ capitalizeFirstLetter(city) }}
                    <mat-divider
                      *ngIf="tripData.cities.length > 1"
                    ></mat-divider>
                  </mat-list-item> </mat-list
              ></ng-container>
              <ng-template #noCitiesToShow>
                <p>There are no cities to show!</p>
              </ng-template>
            </div>
          </mat-tab>
        </mat-tab-group>
        <div *ngIf="tripData.journal.length > 0">
          <travel-log-journal-expansion
            [entries]="tripData.journal"
          ></travel-log-journal-expansion>
        </div>
      </mat-card-content>
      <mat-card-actions
        id="edit-buttons"
        fxLayout="row"
        fxLayoutAlign="end center"
      >
        <div class="actions-container">
          <button
            mat-icon-button
            aria-label="Edit trip"
            (click)="onEditingTrip()"
          >
            <mat-icon id="edit-icon">mode_edit</mat-icon>
          </button>
          <button
            color="warn"
            mat-icon-button
            aria-label="Delete trip"
            (click)="tripsService.removeTripFromFirebase(tripData.id)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  @Input() tripData: TripData;
  @Output() onDeleteTrip = new EventEmitter();

  constructor(public tripsService: TripsService, private router: Router) {}

  onEditingTrip = () => {
    this.tripsService.saveTripToEdit(this.tripData);
    this.router.navigate(['/edit-trip']);
  };

  // Capitalize every word of multiword strings
  capitalizeFirstLetter = (words: string) => {
    return words
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
}
