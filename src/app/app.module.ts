import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './auth/login/login.component';
import { AllTripsComponent } from './trips/all-trips/all-trips.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { CardComponent } from './layout/card/card.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChipsInputComponent } from './trips/add-trip/chips-input/chips-input.component';
import { TripDatePickerComponent } from './trips/add-trip/trip-date-picker/trip-date-picker.component';
import { TripCardComponent } from './trips/trip-card/trip-card.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { AuthService } from './services/auth.service';
import {
  ModalComponent,
  ModalComponentDialog,
} from './layout/modal/modal.component';
import { JournalFormComponent } from './trips/add-trip/journal-form/journal-form.component';
import { EditTripComponent } from './trips/edit-trip/edit-trip/edit-trip.component';
import { JournalExpansionComponent } from './trips/trip-card/journal-expansion/journal-expansion.component';

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
    SignupComponent,
    ChipsInputComponent,
    TripDatePickerComponent,
    SpinnerComponent,
    ModalComponent,
    ModalComponentDialog,
    JournalFormComponent,
    EditTripComponent,
    JournalExpansionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
