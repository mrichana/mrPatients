import { Injectable } from '@angular/core';
import { Patient } from './patient.model';
import { PouchDbAdapterService } from './PouchDB/pouch-db-adapter.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DbAdapterService {

  constructor(private db: PouchDbAdapterService) { }

  public loadPatient(patientId: string): Observable<Patient> {
    return this.db.loadPatient(patientId);
  }

  public savePatient(patient: Patient) {
    this.db.savePatient(patient);
  }

  public deletePatient(patient: Patient) {
    this.db.deletePatient(patient);
  }

  public createId(): string {
    return this.db.createId();
  }

  public createPatientId(): string {
    return this.db.createPatientId();
  }

  public loadPatients(): Observable<{ id: string, patient: Patient }[]> {
    return this.db.loadPatients();
  }
  public filterAndSortPatients([patients, filterBy, orderBy, sortBy]
    : [{ id: string, patient: Patient }[], string, string, string]): { id: string, patient: Patient }[] {
    return this.db.filterAndSortPatients([patients, filterBy, orderBy, sortBy]);
  }


  public getUser(): Observable<User> {
    return this.db.getUser();
  }

  public async signIn(options?) {
    await this.db.signIn(options);
  }

  public async signOut() {
    await this.db.signOut();
  }
}
