import { Patient } from './patient.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PatientFormatingService } from './patient-formating.service';
import { DbAdapterService } from './db-adapter.service';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  // createALotOfPatients() {
  //   let p: Patient;
  //   for (let n = 0; n < 5000; n++) {
  //     p = this.createPatient('');
  //     p.LastName = this.db.createId();
  //     p.FirstName = this.db.createId();
  //     this.savePatient(p);
  //   }
  // }

  constructor(public patientFormat: PatientFormatingService, private db: DbAdapterService) {
  }

  public loadPatient(patientId: string): Observable<Patient> {
    return this.db.loadPatient(patientId);
  }

  public savePatient(patient: Patient): void {
    this.db.savePatient(patient);
  }

  public createPatient(data: string): Patient {
    const ret = this.patientFormat.fromString(data);
    ret.id = this.db.createPatientId();
    return ret;
  }

  public deletePatient(patient: Patient): void {
    this.db.deletePatient(patient);
  }
}

