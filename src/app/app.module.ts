import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatListModule} from '@angular/material/list';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule} from '@angular/material-moment-adapter';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const config = {
  apiKey: 'AIzaSyD6lYfaptJ5VtaNL8yolLD2UDEeEnuc7Ec',
  authDomain: 'mrpatients-fbe9c.firebaseapp.com',
  databaseURL: 'https://mrpatients-fbe9c.firebaseio.com',
  projectId: 'mrpatients-fbe9c',
  storageBucket: 'mrpatients-fbe9c.appspot.com',
  messagingSenderId: '1062968270110'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientsComponent,
    PatientComponent,
    PageNotFoundComponent,
    PatientAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,

    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,

    BrowserAnimationsModule,

    FlexLayoutModule,

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
    MatMomentDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'el'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
