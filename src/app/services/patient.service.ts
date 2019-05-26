import { Patient } from './patient.model';
import { Observable, Subject, BehaviorSubject, merge, combineLatest, of } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor( private auth: AuthService, private db: AngularFirestore ) {
  }

  public loadPatient(patientId: string): Observable<Patient> {
    const ret = new Subject<Patient>();
    this.auth.user$.subscribe(user => {
      if (user) {
        this.db.collection('doctors').doc(user.uid)
          .collection('patients').doc<Patient>(patientId).valueChanges().subscribe(d => ret.next(d));
      }
    });
    return ret;
  }
}
