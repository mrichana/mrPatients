import { Injectable } from '@angular/core';
import { Patient } from './patient.model';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientFormatingService {

  static regexTel = /\b2\d{9}\b/;
  static regexMobile = /\b69\d{8}\b/;
  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;
  static regexBirthdate = /\b(?<Birthdate>(?<day>[0-3]?\d)\/(?<Month>[0-1]?\d{1})\/(?<Year>(?:19|20)?\d{2}))\b/;
  static regexLastFirstName =
    /(?<LastName>[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?),[ ]?(?<FirstName>[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+[ ]?[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)/;
  static regexFirstLastName =
    /(?<FirstName>[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?) (?<LastName>[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?)/;
  static regexLastName =
    /(?<LastName>[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?)/;

  constructor() { }

  public displayName(patient: Patient): string {
    let ret: string = patient.LastName;
    if (patient.FirstName) { ret += (', ' + patient.FirstName); }
    return ret;
  }

  public age(patient: Patient): string {
    if (!patient.Birthdate) { return ''; }
    return '(' + moment().diff(patient.Birthdate, 'years').toString() + ')';
  }

  public encodeURI(URI: string): string {
    return encodeURIComponent(URI);
  }

  public timestampToMoment(date: firebase.firestore.Timestamp): moment.Moment {
    return date ? moment(date.toDate()) : null;
  }

  public timestampToString(date: firebase.firestore.Timestamp): string {
    return moment(date.toDate()).format('DD/MM/YYYY');
  }

  public momentToString(date: moment.Moment): string {
    return date.format('DD/MM/YYYY');
  }

  public fromString(searchString: string): Patient {
    const ret: any = {};

    if (searchString) {
      let result: RegExpExecArray;

      if (result = PatientFormatingService.regexMobile.exec(searchString)) {
        ret.Mobile = result[0];
      }

      if (result = PatientFormatingService.regexTel.exec(searchString)) {
        ret.Telephone = result[0];
      }

      if (result = PatientFormatingService.regexAmka.exec(searchString)) {
        ret.Amka = result[0];
        let date = moment(result[0], 'DDMMYY');
        if (date.isAfter(moment())) {
          date = moment({ year: date.year() - 100, month: date.month(), day: date.day() });
        }
        ret.Birthdate = date;
        ret.Sex = (!!(Number(result.groups['Sex']) % 2));
      }

      if (result = PatientFormatingService.regexBirthdate.exec(searchString)) {
        let date = moment(result[0], 'DDMMYYYY');
        if (date.isAfter(moment())) {
          date = moment({ year: date.year() - 100, month: date.month(), day: date.day() });
        }
        ret.Birthdate = date;
      }


      if (result = PatientFormatingService.regexLastFirstName.exec(searchString)) { } else
        if (result = PatientFormatingService.regexFirstLastName.exec(searchString)) { } else {
          result = PatientFormatingService.regexLastName.exec(searchString);
        }

      if (result) {
        ret.LastName = result.groups['LastName'] || '';
        ret.FirstName = result.groups['FirstName'] || '';
      }
    }
    return ret;
  }
}
