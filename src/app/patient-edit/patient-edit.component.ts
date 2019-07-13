import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { VerifyDeleteDialogComponent } from '../verify-delete-dialog/verify-delete-dialog.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { VerifyDropChangesDialogComponent } from '../verify-drop-changes-dialog/verify-drop-changes-dialog.component';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.less']
})
export class PatientEditComponent implements OnInit {

  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;

  public patient: Patient;

  @ViewChild('patientForm', { static: false }) public patientForm: NgForm;

  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    public patientFormat: PatientFormatingService,
    private dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit() {
      this.route.data.subscribe((data: { patient: Patient }) => {
      this.titleService.setTitle('Ασθενείς - ' + this.patientFormat.displayName(data.patient));
      this.patient = data.patient;
    });
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

  Age(): number {
    return this.patientFormat.age(this.patient);
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
    const verifyDialog = this.dialog.open(VerifyDropChangesDialogComponent);
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

  removeDiagnosis(diagnosis: string) {
    if (!this.patient.Diagnoses) { return; }
    const index = this.patient.Diagnoses.indexOf(diagnosis);

    if (index >= 0) {
      this.patient.Diagnoses.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }
}
