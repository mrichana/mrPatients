import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { VerifyDropchangesDialogComponent } from '../verify-dropchanges-dialog/verify-dropchanges-dialog.component';

@Component({
  selector: 'app-patient-add',
  templateUrl: '../patient-edit/patient-edit.component.html',
  styleUrls: ['../patient-edit/patient-edit.component.less']
})
export class PatientAddComponent implements OnInit {

  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;

  public patient: Patient;
  private patientParameters: string;

  @ViewChild('patientForm', { static: false }) public patientForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    public patientFormat: PatientFormatingService,
    private titleService: Title,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς - Νέος');
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientParameters = params.get('search');
        _this.patient = _this.patientService.createPatient(_this.patientParameters);
      }
    );
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.patientService.savePatient(this.patient);
      this.router.navigate(['/patient/' + this.patient.id]);
    }
  }

  Today(): Date {
    return new Date();
  }

  Age(): null | number {
    return this.patient.Birthdate ? moment().diff(this.patient.Birthdate, 'years') : null;
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

  canDeactivate(): Observable<boolean> | boolean {
    console.log(this.patientForm);
    if (!this.patientForm.dirty) {
      return true;
    }

    const _this = this;
    const verifyDialog = this.dialog.open(VerifyDropchangesDialogComponent);
    return verifyDialog.afterClosed();
  }

  notesEditorCreated(editor) {
    return;
  }

}

