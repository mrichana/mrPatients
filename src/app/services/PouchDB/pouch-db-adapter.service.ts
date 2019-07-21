import { Injectable } from '@angular/core';

import { Observable, from, fromEvent, concat, of } from 'rxjs';
import { Patient } from '../patient.model';
import { User } from '../user.model';
import { map, switchMap } from 'rxjs/operators';

import PouchDB from 'pouchdb';
import PouchDBUpsert from 'pouchdb-upsert';

import { UUID } from 'angular2-uuid';
import { PatientAdapter } from './pouch-patient-adapter';
// import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBUpsert);
// PouchDB.plugin(PouchDBFind);

@Injectable({
  providedIn: 'root'
})
export class PouchDbAdapterService {

  private user$: Observable<User>;

  private databaseName = 'patients';
  private localDb: PouchDB.Database<{}>;
  private databaseUuid: string;

  constructor(
    private patientAdapter: PatientAdapter) {
    this.prepareDatabase();
    this.user$ = this.getUser();
  }

  private async prepareDatabase() {
    this.localDb = new PouchDB(this.databaseName);

    const options = {
      live: true,
      retry: true,
      continuous: true
    };

    try {
      await this.localDb.put({ _id: '_local/databaseId', value: this.createId() });
    } catch {
    } finally {
      const doc = await this.localDb.get('_local/databaseId');
      this.databaseUuid = doc['value'];
    }

//    this.localDb.sync('https://couchdb.richana.eu/patients_' + this.databaseUuid, options);
  }

  public loadPatient(patientId: string): Observable<Patient> {
    const getPatient = (id: string) => {
      return from(this.localDb.get(patientId)).pipe(map(d => {
        return this.patientAdapter.import(d);
      }));
    };
    const ret = concat(
      getPatient(patientId),
      fromEvent(this.localDb.changes({ since: 'now', live: true, doc_ids: [patientId], include_docs: true }), 'change').pipe(
        map(d => {
          return this.patientAdapter.import(d[0]['doc']);
        })
      )
    );
    return ret;
  }

  public savePatient(patient: Patient) {
    this.localDb.put({ _id: patient.id, _rev: patient['_rev'], value: this.patientAdapter.export(patient) });
  }

  public deletePatient(patient: Patient) {
    this.localDb.remove({ _id: patient.id, _rev: patient['_rev'] });
  }

  public createId(): string {
    return UUID.UUID();
  }

  public createPatientId(): string {
    return 'patient::' + UUID.UUID();
  }

  public loadPatients(): Observable<{ id: string, patient: Patient }[]> {
    const patientList = () => {
      return from(this.localDb.allDocs({
        include_docs: true,
        startkey: 'patient::',
        endkey: 'patient::\ufff0'
      })).pipe(
        map(d => {
          return d.rows.map(item => {
            return {
              id: item.doc._id,
              patient: this.patientAdapter.import(item.doc)
            };
          });
        })
      );
    };
    const ret = concat(
      patientList(),
      fromEvent(this.localDb.changes({ since: 'now', live: true }), 'change').pipe(switchMap(() => {
        return patientList();
      }))
    );
    return ret;
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
    return of({ uid: 'local', email: '' });
  }

  public async signIn() {
  }

  public async signOut() {
  }

  private updateUserData(user: User) {
  }
}
