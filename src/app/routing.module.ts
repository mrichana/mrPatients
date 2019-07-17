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
  {
    path: 'patients', component: PatientsComponent,
    data: { animation: 'list' }
  },
  {
    path: 'patient/edit/:id', component: PatientEditComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: { patient: PatientPreloadService },
    data: { animation: 'edit' }
  },
  {
    path: 'patient/edit', redirectTo: '404'
  },
  {
    path: 'patient/add/:search', component: PatientAddComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/add', component: PatientAddComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/:id', component: PatientComponent,
    resolve: { patient: PatientPreloadService },
    data: { animation: 'details' }
  },
  {
    path: '', redirectTo: '/patients', pathMatch: 'full',
  },

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
