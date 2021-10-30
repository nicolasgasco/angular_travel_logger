import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './auth/login/login.component';
import { TripsComponent } from './trips/trips.component';
import { AllTripsComponent } from './trips/all-trips/all-trips.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { CardComponent } from './layout/card/card.component';
import { CitiesListComponent } from './trips/add-trip/cities-list/cities-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TripCardComponent } from './layout/trip-card/trip-card.component';
import { CitiesChipsComponent } from './trips/add-trip/cities-chips/cities-chips.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TripsComponent,
    AllTripsComponent,
    LandingComponent,
    FooterComponent,
    AddTripComponent,
    CardComponent,
    CitiesListComponent,
    HeaderComponent,
    SidenavListComponent,
    TripCardComponent,
    CitiesChipsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
