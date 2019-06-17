import { Component, OnInit } from '@angular/core';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.less']
})
export class PatientAddComponent implements OnInit {

  static regexAmka = /\b(?<Birthdate>\d{6})\d{4}(?<Sex>\d)\b/;

  public patient: Patient;
  private patientParameters: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    public patientFormat: PatientFormatingService
) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientParameters = params.get('search');
        _this.patient = _this.patientService.createPatient(_this.patientParameters);
      }
    );
  }

  onSubmit(): void {
    console.log('submit');
    console.log(this.patient);
    this.patientService.savePatient(this.patient);
  }

  Today(): Date {
    return new Date();
  }

  Age(): null | number {
    return this.patient.Birthdate ? moment().diff(this.patient.Birthdate, 'years') : null;
  }


  amkaChanged(): void {
    let result: RegExpExecArray;
    if (result = PatientFormatingService.regexAmka.exec(this.patient.Amka)) {
      let date = moment(result[0], 'DDMMYY');
      if (date.isAfter(moment())) {
        date = moment({ year: date.year() - 100, month: date.month(), day: date.day() });
      }
      this.patient.Birthdate = this.patient.Birthdate || date;
      this.patient.Sex = (this.patient.Sex == null) ? (!(Number(result.groups['Sex']) % 2)) : this.patient.Sex;
    }
  }
}
