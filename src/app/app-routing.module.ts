import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { AllTripsComponent } from './trips/all-trips/all-trips.component';
import { EditTripComponent } from './trips/edit-trip/edit-trip/edit-trip.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'all-trips', component: AllTripsComponent, canActivate: [AuthGuard] },
  { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard] },
  { path: 'edit-trip', component: EditTripComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
