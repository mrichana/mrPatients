import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, EMPTY } from 'rxjs';
import { Patient, PatientAdapter } from '../patient.model';
import { User } from '../user.model';
import { flatMap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbAdapterService {

  private user$: Observable<User>;

  constructor(
    private patientAdapter: PatientAdapter,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.getUser();
  }

  public loadPatient(patientId: string): Observable<Patient> {
    return this.user$.pipe(
      flatMap(user => this.db.collection('doctors').doc(user.uid).collection('patients').doc<Patient>(patientId).valueChanges().pipe(
        map(patient => this.patientAdapter.import(patient))
      ))
    );
  }

  public savePatient(patient: Patient) {
    this.user$.subscribe(user => {
      this.db.collection('doctors').doc(user.uid)
        .collection('patients').doc<Patient>(patient.id).set(this.patientAdapter.export(patient));
    });
  }

  public deletePatient(patient: Patient) {
    this.user$.subscribe(user => {
      this.db.collection('doctors').doc(user.uid)
        .collection('patients').doc<Patient>(patient.id).delete();
    });
  }

  public createId(): string {
    return this.db.createId();
  }

  public loadPatients(): Observable<{id: string, patient: Patient}[]> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.db.collection('doctors').doc(user.uid).collection<Patient>('patients').snapshotChanges().
          pipe(map(actions => {
            return actions.map(action => {
              return {
                id: action.payload.doc.id,
                patient: this.patientAdapter.import(action.payload.doc.data())
              };
            });
          }));
      } else {
        return EMPTY;
      }
    }));
  }

  private compare(a: any, b: any, field: string): number {
    if (!field) {
      return 0;
    }

    let valueA = a[field];
    let valueB = b[field];

    if (valueA && typeof valueA['localeCompare'] === 'function') {
      return valueA.toLocaleLowerCase().localeCompare(valueB ? valueB.toLocaleLowerCase() : valueB);
    }

    if (!valueA || typeof valueA === 'undefined') {
      valueA = 0;
    } else if (typeof valueA['toMillis'] === 'function') {
      valueA = valueA.toMillis();
    }

    if (!valueB || typeof valueB === 'undefined') {
      valueB = 0;
    } else if (typeof valueB['toMillis'] === 'function') {
      valueB = valueB.toMillis();
    }

    return -(valueA - valueB);
  }

  private filter(patient: { id: string, patient: Patient }, filterBy: string): boolean {
    const filter = new RegExp(filterBy);
    const fullText: string =
      (patient.patient.LastName + '|' + patient.patient.FirstName + '|' + (patient.patient.Amka ? patient.patient.Amka + '|' : '')
        + (patient.patient.Mobile ? patient.patient.Mobile + '|' : '') + (patient.patient.Telephone ? patient.patient.Telephone + '|' : '')
      ).toLocaleLowerCase();
    return filter.test(fullText);
  }

  public filterAndSortPatients([patients, filterBy, orderBy, sortBy]
    : [{ id: string, patient: Patient }[], string, string, string]): { id: string, patient: Patient }[] {
    if (patients) {
      if (filterBy) {
        patients = patients.filter(patient => this.filter(patient, filterBy));
      }
      if (orderBy) {
        patients = patients.sort((a, b) => (sortBy === 'normal'
          ? this.compare(a.patient, b.patient, orderBy)
          : -this.compare(a.patient, b.patient, orderBy)));
      }
      return patients;
    }
  }

  public getUser(): Observable<User> {
    if (!this.user$) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }
    return this.user$;
  }

  public async signIn() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.updateUserData(credential.user);
    } catch (e) { console.log(e); }
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    userRef.set(data, { merge: true });
  }

}
