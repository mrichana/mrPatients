import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { PatientAddComponent} from './patient-add/patient-add.component';
import { PatientComponent } from './patient/patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard]},
  { path: 'patient/edit/:id', component: PatientEditComponent, canActivate: [AuthGuard]},
  { path: 'patient/edit', component: PageNotFoundComponent},
  { path: 'patient/add/:search', component: PatientAddComponent, canActivate: [AuthGuard]},
  { path: 'patient/add', component: PatientAddComponent, canActivate: [AuthGuard]},
  { path: 'patient/:id', component: PatientComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/patients', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
