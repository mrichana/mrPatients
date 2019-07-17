import { Injectable } from '@angular/core';
import { Patient } from './patient.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PatientFormatingService {

  static regexTelephone = /(\+\d{2})?(2\d{9})/;
  static regexMobile = /(\+\d{2})?(69\d{8})/;
  static regexAmka = /\b(\d{6})\d{3}(\d)(\d)\b/;
  static regexBirthdate = /\b(([0-3]?\d)\/([0-1]?\d{1})\/((?:19|20)?\d{2}))\b/;
  /* tslint:disable */
  static regexLastFirstName = /([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?),[ ]?([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+[ ]?[a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)/;
  static regexFirstLastName = /([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?) ([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?)/;
  /* tslint:enable */
  static regexLastName =
    /([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+(?:[-][a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+)?)/;

  constructor() { }

  public displayName(patient: Patient): string {
    let ret: string = patient.LastName;
    if (patient.FirstName) { ret += (', ' + patient.FirstName); }
    return ret;
  }

  public age(patient: Patient): number {
    return moment().diff(patient.Birthdate, 'years');
  }

  public displayAge(patient: Patient): string | number {
    if (!patient.Birthdate) { return ''; }
    return '(' + this.age(patient).toString() + ')';
  }


  public encodeURI(URI: string): string {
    return encodeURIComponent(URI);
  }

  public momentToString(date: moment.Moment): string {
    return date.format('DD/MM/YYYY');
  }

  private luhnTest(amka: string) {
    let length = amka.length;
    let multiple = 0;
    const producedValue = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ];
    let sum = 0;
    while (length--) {
      sum += producedValue[multiple][parseInt(amka.charAt(length), 10)];
      multiple = multiple ? 0 : 1;
    }
    return (sum % 10 === 0 && sum > 0);
  }

  public verifyAmka (amka: string): boolean {
    const amkaTest = PatientFormatingService.regexAmka.test(amka);
    return amkaTest && this.luhnTest(amka);
  }

  public verifyBirthdate (birthdate: string): boolean {
    const Birthdate = moment(birthdate, 'DDMMYYYY');
    return Birthdate.isSameOrBefore(moment());
  }

  public verifyMobile (mobile: string): boolean {
    return PatientFormatingService.regexMobile.test(mobile);
  }

  public verifyTelephone (telephone: string): boolean {
    return PatientFormatingService.regexTelephone.test(telephone);
  }

  public fromString(searchString: string): Patient {
    const ret: Patient = {
      id: '',
      LastName: '',
    };

    if (searchString) {
      let result: RegExpExecArray;

      if (this.verifyMobile(searchString)) {
        result = PatientFormatingService.regexMobile.exec(searchString);
        ret.Mobile = result[2];
      }

      if (this.verifyTelephone(searchString)) {
        result = PatientFormatingService.regexTelephone.exec(searchString);
        ret.Telephone = result[2];
      }

      if (this.verifyAmka(searchString)) {
        result = PatientFormatingService.regexAmka.exec(searchString);
        ret.Amka = result[0];
        let date = moment(result[1], 'DDMMYY');

        if (date.isAfter(moment())) {
          date = moment({ year: date.year() - 100, month: date.month(), day: date.day() });
        }
        ret.Birthdate = date;
        ret.Sex = (!!(Number(result[2]) % 2));
      }

      if (result = PatientFormatingService.regexLastFirstName.exec(searchString)) {
        ret.FirstName = result[2] || '';
        ret.LastName = result[1] || '';
       } else if (result = PatientFormatingService.regexFirstLastName.exec(searchString)) {
        ret.FirstName = result[1] || '';
        ret.LastName = result[2] || '';
       } else if (result = PatientFormatingService.regexLastName.exec(searchString)) {
        ret.LastName = result[0] || '';
      }
    }
    return ret as Patient;
  }


  public displaySex(patient: Patient): string {
    if (patient.Sex === true) {
      return '♂';
    }
    if (patient.Sex === false) {
      return '♀';
    }

  }
}
