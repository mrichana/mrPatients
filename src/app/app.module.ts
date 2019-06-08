import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientAddComponent } from './patient-add/patient-add.component';

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

    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
