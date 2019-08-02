import { AuthGuard } from './services/auth.guard';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientComponent } from './patient/patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientPreloadService } from './services/patient-preload.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

const routes2: Routes = [
  {
    path: 'login', component: LoginComponent,
    data: { animation: 'login' }
  },
  {
    path: 'patients', component: PatientsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'list' }
  },
  {
    path: 'patient/edit/:id', component: PatientEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    resolve: { patient: PatientPreloadService },
    data: { animation: 'edit' }
  },
  {
    path: 'patient/edit', redirectTo: '404'
  },
  {
    path: 'patient/add/:search', component: PatientAddComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/add', component: PatientAddComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/:id', component: PatientComponent,
    canActivate: [AuthGuard],
    resolve: { patient: PatientPreloadService },
    data: { animation: 'details' }
  },
  {
    path: '/', redirectTo: '/patients', pathMatch: 'full',
    canActivate: [AuthGuard]
  },

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
