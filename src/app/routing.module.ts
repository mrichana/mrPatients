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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'patients', component: PatientsComponent, canActivate: [AuthGuard],
    data: { animation: 'list' }
  },
  {
    path: 'patient/edit/:id', component: PatientEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  { path: 'patient/edit', component: PageNotFoundComponent },
  {
    path: 'patient/add/:search', component: PatientAddComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/add', component: PatientAddComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard],
    data: { animation: 'edit' }
  },
  {
    path: 'patient/:id', component: PatientComponent, canActivate: [AuthGuard],
    data: { animation: 'details' }
  },
  { path: '', redirectTo: '/patients', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
