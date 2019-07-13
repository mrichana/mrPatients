import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, EMPTY } from 'rxjs';
import { Patient, PatientAdapter } from '../patient.model';
import { flatMap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbAdapterService {

  constructor(private auth: AuthService, private patientAdapter: PatientAdapter, private db: AngularFirestore) { }

  public loadPatient(patientId: string): Observable<Patient> {
    return this.auth.user$.pipe(
      flatMap(user => this.db.collection('doctors').doc(user.uid).collection('patients').doc<Patient>(patientId).valueChanges().pipe(
        map(patient => this.patientAdapter.import(patient))
      ))
    );
  }

  public savePatient(patient: Patient) {
    this.auth.user$.subscribe(user => {
      this.db.collection('doctors').doc(user.uid)
        .collection('patients').doc<Patient>(patient.id).set(this.patientAdapter.export(patient));
    });
  }

  public deletePatient(patient: Patient): void {
    this.auth.user$.subscribe(user => {
      this.db.collection('doctors').doc(user.uid)
        .collection('patients').doc<Patient>(patient.id).delete();
    });
  }

  public createId() {
    return this.db.createId();
  }

  public loadPatients() {
    return this.auth.user$.pipe(switchMap(user => {
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


}
