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
import { NewTripComponent } from './trips/new-trip/new-trip.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { CardComponent } from './layout/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TripsComponent,
    AllTripsComponent,
    NewTripComponent,
    LandingComponent,
    FooterComponent,
    AddTripComponent,
    CardComponent,
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
