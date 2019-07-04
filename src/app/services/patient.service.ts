import { Patient } from './patient.model';
import { Observable, Subject} from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { PatientFormatingService } from '../services/patient-formating.service';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor( private auth: AuthService, private db: AngularFirestore, public patientFormat: PatientFormatingService) {
  }

  public loadPatient(patientId: string): Observable<Patient> {
    const ret = new Subject<Patient>();
    this.auth.user$.subscribe(user => {
      if (user) {
        this.db.collection('doctors').doc(user.uid)
          .collection('patients').doc<Patient>(patientId).valueChanges().subscribe(d => {
            d.Birthdate = d.Birthdate ? this.patientFormat.timestampToMoment(d.Birthdate as firebase.firestore.Timestamp) : null;
            ret.next(d);
          });
      }
    });
    return ret;
  }

  public savePatient(patient: Patient) {
    this.auth.user$.subscribe(user => {
      if (user) {
        patient.LastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        patient.Birthdate = patient.Birthdate ? (patient.Birthdate as Moment).toDate() : null;
        this.db.collection('doctors').doc(user.uid)
          .collection('patients').doc<Patient>(patient.id).set(patient);
      }
    });
  }

  public createPatient(data: string): Patient {
    const id: string = this.db.createId();
    const ret = this.patientFormat.fromString(data);

    ret.id = id;
    return ret;
  }

  public deletePatient(patient: Patient): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.db.collection('doctors').doc(user.uid)
          .collection('patients').doc<Patient>(patient.id).delete();
      }
    });
  }
}
