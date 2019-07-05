import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog, MatChipInputEvent, MatChipListChange } from '@angular/material';
import { VerifyDeleteDialogComponent } from '../verify-delete-dialog/verify-delete-dialog.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { VerifyDropchangesDialogComponent } from '../verify-dropchanges-dialog/verify-dropchanges-dialog.component';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.less']
})
export class PatientEditComponent implements OnInit {

  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;

  public patient: Patient;
  private patientId: string;

  @ViewChild('patientForm', { static: false }) public patientForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    public patientFormat: PatientFormatingService,
    private dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientId = params.get('id');
        _this.patientService.loadPatient(_this.patientId).subscribe(d => {
          _this.patient = d;
          _this.titleService.setTitle('Ασθενείς - ' + _this.patientFormat.displayName(d));
        });
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

  deletePatient() {
    const _this = this;
    const verifyDialog = this.dialog.open(VerifyDeleteDialogComponent);
    verifyDialog.afterClosed().subscribe(verifyDelete => {
      if (verifyDelete) {
        _this.patientService.deletePatient(_this.patient);
        this.router.navigate(['/patients'], { replaceUrl: true });
      }
    });
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
    if (this.patientForm.pristine || this.patientForm.submitted) {
      return true;
    }

    const _this = this;
    const verifyDialog = this.dialog.open(VerifyDropchangesDialogComponent);
    return verifyDialog.afterClosed();
  }

  notesEditorCreated(editor) {
    editor.focus();
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
