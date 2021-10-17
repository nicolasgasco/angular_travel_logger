import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { AllTripsComponent } from './trips/all-trips/all-trips.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'all-trips', component: AllTripsComponent },
  { path: 'add-trip', component: AddTripComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
