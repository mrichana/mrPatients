import { Component, OnInit } from '@angular/core';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { VerifyDeleteDialogComponent } from '../verify-delete-dialog/verify-delete-dialog.component';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.less']
})
export class PatientEditComponent implements OnInit {

  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;

  public patient: Patient;
  private patientId: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    public patientFormat: PatientFormatingService,
    private dialog: MatDialog
) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientId = params.get('id');
        _this.patientService.loadPatient(_this.patientId).subscribe(d => _this.patient = d);
      }
    );
  }

  onSubmit(): void {
    this.patientService.savePatient(this.patient);
    this.router.navigate(['/patients']);
  }

  Today(): Date {
    return new Date();
  }

  Age(): null | number {
    return this.patient.Birthdate ? moment().diff(this.patient.Birthdate, 'years') : null;
  }

  deletePatient() {
    console.log('click');
    const _this = this;
    const verifyDialog = this.dialog.open(VerifyDeleteDialogComponent);
    verifyDialog.afterClosed().subscribe(verifyDelete => {
      if (verifyDelete) {
        _this.patientService.deletePatient(_this.patient);
        this.router.navigate(['/patients']);
      }
    })

  }

  amkaChanged(errors: boolean): void {
    if (!errors) {
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
}
