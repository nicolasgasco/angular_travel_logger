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
import { AllTripsComponent } from './trips/all-trips/all-trips.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { CardComponent } from './layout/card/card.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TripCardComponent } from './layout/trip-card/trip-card.component';
import { CitiesChipsComponent } from './trips/add-trip/cities-chips/cities-chips.component';
import {
  CardActionsComponent,
  DeleteCardModalComponent,
} from './layout/trip-card/card-actions/card-actions.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllTripsComponent,
    LandingComponent,
    FooterComponent,
    AddTripComponent,
    CardComponent,
    HeaderComponent,
    SidenavListComponent,
    TripCardComponent,
    CitiesChipsComponent,
    CardActionsComponent,
    DeleteCardModalComponent,
    SignupComponent,
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
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
