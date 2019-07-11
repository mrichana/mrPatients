import { Patient } from './patient.model';
import { Observable, Subject, EMPTY } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { PatientFormatingService } from '../services/patient-formating.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private auth: AuthService, private db: AngularFirestore, public patientFormat: PatientFormatingService) {
  }

  public loadPatient(patientId: string): Observable<Patient> {
    const ret = new Subject<Patient>();
    this.auth.user$.subscribe(user => {
      if (user) {
        this.db.collection('doctors').doc(user.uid)
          .collection('patients').doc<Patient>(patientId).valueChanges().subscribe(
            d => {
              if (d) {
                d.Birthdate = d.Birthdate ? moment.unix(<number><unknown>d.Birthdate) : null;
                d.LastUpdate = moment.unix(<number><unknown>d.LastUpdate);
              }
              ret.next(d);
            },
            error => {
              ret.next(undefined);
            }
          );
      }
    });
    return ret;
  }

  public savePatient(patient: Patient) {
    this.auth.user$.subscribe(user => {
      if (user) {
        patient.LastUpdate = <moment.Moment><unknown>(moment().unix());
        patient.Birthdate = patient.Birthdate?<moment.Moment><unknown>(patient.Birthdate.unix()):null;
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
