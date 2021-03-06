import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { QuillModule } from 'ngx-quill';

import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PatientComponent } from './patient/patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AmkaValidatorDirective } from './directives/amka-validator.directive';
import { TelephoneValidatorDirective } from './directives/telephone-validator.directive';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { BirthdateValidatorDirective } from './directives/birthdate-validator.directive';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { VerifyDeleteDialogComponent } from './verify-delete-dialog/verify-delete-dialog.component';
import { VerifyDropChangesDialogComponent } from './verify-drop-changes-dialog/verify-drop-changes-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { SurgeryEditDialogComponent } from './surgery-edit-dialog/surgery-edit-dialog.component';
import { DrugEditDialogComponent } from './drug-edit-dialog/drug-edit-dialog.component';
import { ReminderEditDialogComponent } from './reminder-edit-dialog/reminder-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PatientsComponent,
    PatientComponent,
    PageNotFoundComponent,
    PatientAddComponent,
    AmkaValidatorDirective,
    TelephoneValidatorDirective,
    MobileValidatorDirective,
    BirthdateValidatorDirective,
    PatientEditComponent,
    VerifyDeleteDialogComponent,
    VerifyDropChangesDialogComponent,
    PasswordValidatorDirective,
    SurgeryEditDialogComponent,
    DrugEditDialogComponent,
    ReminderEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCardModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatAutocompleteModule,

    QuillModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'el' },
    Title
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    VerifyDeleteDialogComponent,
    VerifyDropChangesDialogComponent,
    SurgeryEditDialogComponent,
    DrugEditDialogComponent,
    ReminderEditDialogComponent,
  ]
})
export class AppModule { }
