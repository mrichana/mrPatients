import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { VerifyDropChangesDialogComponent } from '../verify-drop-changes-dialog/verify-drop-changes-dialog.component';

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

  panelOpenState = false;

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
    if (!this.patientForm.dirty || this.patientForm.submitted) {
      return true;
    }

    const verifyDialog = this.dialog.open(VerifyDropChangesDialogComponent);
    return verifyDialog.afterClosed();
  }

  notesEditorCreated(editor) {
    return;
  }


  addDiagnosis(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (!this.patient.Diagnoses) {
        this.patient.Diagnoses = [] as string[];
      }
      this.patient.Diagnoses.push(value.trim());
      this.patientForm.form.markAsDirty();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeDiagnosis(diagnosis: string, event) {
    if (!this.patient.Diagnoses) { return; }
    const index = this.patient.Diagnoses.indexOf(diagnosis);

    if (index >= 0) {
      this.patient.Diagnoses.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }
}

