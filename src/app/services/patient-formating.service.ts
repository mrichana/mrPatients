import { Injectable } from '@angular/core';
import { Patient } from './patient.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PatientFormatingService {

  constructor() { }

  public displayName (patient: Patient): string {
    let ret: string = patient.LastName;
    if (patient.FirstName) { ret += (', ' + patient.FirstName)}
    return ret;
  }

  public age (patient: Patient): string {
    if (!patient.Birthdate) {return ''; }
    return '(' + moment().diff(patient.Birthdate.toMillis(), 'years').toString() + ')';
  }

  public encodeURI (URI: string): string {
    return encodeURIComponent(URI);
  }

  public date (timestamp: firebase.firestore.Timestamp): Date {
    return timestamp.toDate();
  }

  public dateString (timestamp: firebase.firestore.Timestamp): string {
    return moment(timestamp.toDate()).format('DD/MM/YYYY');
  }
}
