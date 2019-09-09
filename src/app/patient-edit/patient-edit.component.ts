import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { VerifyDeleteDialogComponent } from '../verify-delete-dialog/verify-delete-dialog.component';
import { NgForm, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { VerifyDropChangesDialogComponent } from '../verify-drop-changes-dialog/verify-drop-changes-dialog.component';
import { SurgeryEditDialogComponent } from '../surgery-edit-dialog/surgery-edit-dialog.component';
import { DrugEditDialogComponent } from '../drug-edit-dialog/drug-edit-dialog.component';
import { ReminderEditDialogComponent } from '../reminder-edit-dialog/reminder-edit-dialog.component';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.less']
})
export class PatientEditComponent implements OnInit {

  public patient: Patient;

  @ViewChild('patientForm', { static: false }) public patientForm: NgForm;
  public diagnosisListInput;

  panelOpenState = false;

  constructor(
    public patientFormat: PatientFormatingService,
    protected route: ActivatedRoute,
    protected patientService: PatientService,
    protected router: Router,
    protected dialog: MatDialog,
    protected titleService: Title
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
        this.patient.Sex = (this.patient.Sex == null) ? (!!(Number(result[2]) % 2)) : this.patient.Sex;
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

  addAllergies(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (!this.patient.Allergies) {
        this.patient.Allergies = [] as string[];
      }
      this.patient.Allergies.push(value.trim());
      this.patientForm.form.markAsDirty();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAllergy(allergy: string) {
    if (!this.patient.Allergies) { return; }
    const index = this.patient.Allergies.indexOf(allergy);

    if (index >= 0) {
      this.patient.Allergies.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }

  addSurgeries(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const regexDate = /(.*?)(?: *)(?:(?:\(([0-9\/\\\-\.]*)\))?)$/;
      const result = regexDate.exec(value);
      //   return {fulltext: result[0], name: result[1], date: result[2] ? moment(result[2]) : null};
      // });

      this.addSurgeriesCommon(result[1], (result[2] ? moment(result[2]) : undefined));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  openSurgeryEditDialog() {
    this.dialog.open(SurgeryEditDialogComponent, { width: '70%' })
      .afterClosed().subscribe((result: { SurgeryName: string, SurgeryDate: moment.Moment }) => {
        if ((result.SurgeryName || '').trim()) {
          this.addSurgeriesCommon(result.SurgeryName, result.SurgeryDate && result.SurgeryDate.isValid ? result.SurgeryDate : undefined);
        }
      });
  }

  addSurgeriesCommon(Name: string, Date?: moment.Moment) {
    if ((Name || '').trim()) {
      if (!this.patient.Surgeries) {
        this.patient.Surgeries = [] as { Name: string, Date: moment.Moment }[];
      }
      this.patient.Surgeries.push({ Name: Name.trim(), Date: Date });
      this.patient.Surgeries.sort((a, b) => {
        return (moment.isMoment(a.Date) ? a.Date.valueOf() : moment.now()) -
          (moment.isMoment(b.Date) ? b.Date.valueOf() : moment.now());
      });
      this.patientForm.form.markAsDirty();
    }
  }

  removeSurgery(Surgery: { Name: string, Date?: moment.Moment }) {
    if (!this.patient.Surgeries) { return; }
    const index = this.patient.Surgeries.indexOf(Surgery);

    if (index >= 0) {
      this.patient.Surgeries.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }


  addDrugs(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      // tslint:disable-next-line: max-line-length
      const regexDrug = /^(?:(tb|tab|tabs|cp|cap|caps|amp|inj|sc\.inj|im\.inj|iv\.inj|sup|sups|supp|v\.sup|v\.sups|v\.supp) )?(.*) ([0-9].*)(?: (.+x.+))?$/;
      // TODO: The above regex works only in simple cases...
      const result = regexDrug.exec(value);

      this.addDrugsCommon(result[2], result[1], result[3], result[4]);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  openDrugEditDialog() {
    this.dialog.open(DrugEditDialogComponent, { width: '70%' })
      .afterClosed().subscribe((result: { Name: string, Type: string, Concentration: string, Dosage: string }) => {
        if ((result.Name || '').trim()) {
          this.addDrugsCommon(result.Name, result.Type, result.Concentration, result.Dosage);
        }
      });
  }

  addDrugsCommon(Name: string, Type?: string, Concentration?: string, Dosage?: string) {
    if ((Name || '').trim()) {
      if (!this.patient.Drugs) {
        this.patient.Drugs = [] as { Name: string, Type?: string, Concentration?: string, Dosage?: string }[];
      }
      this.patient.Drugs.push({ Name, Type, Concentration, Dosage });
      this.patientForm.form.markAsDirty();
    }
  }

  removeDrug(Drug: { Name: string, Type?: string, Concentration?: string, Dosage?: string }) {
    if (!this.patient.Drugs) { return; }
    const index = this.patient.Drugs.indexOf(Drug);

    if (index >= 0) {
      this.patient.Drugs.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }

  addReminders(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const regexDate = /(.*?)(?: *)(?:(?:\(([0-9\/\\\-\.]*)\))?)$/;
      const result = regexDate.exec(value);
      //   return {fulltext: result[0], name: result[1], date: result[2] ? moment(result[2]) : null};
      // });

      this.addRemindersCommon(result[1], (result[2] ? moment(result[2]) : undefined));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  openReminderEditDialog() {
    this.dialog.open(ReminderEditDialogComponent, { width: '70%' })
      .afterClosed().subscribe((result: { ReminderName: string, ReminderDate: moment.Moment, Global: boolean }) => {
        if (result.ReminderDate && result.ReminderDate.isValid) {
          this.addRemindersCommon(result.ReminderName, result.ReminderDate);
        }
      });
  }

  addRemindersCommon(Name: string, Date: moment.Moment ) {
    if ((Name || '').trim()) {
      if (!this.patient.Reminders) {
        this.patient.Reminders = [] as { Name: string, Date: moment.Moment }[];
      }
      this.patient.Reminders.push({ Name: Name.trim(), Date: Date });
      this.patient.Reminders.sort((a, b) => {
        return (moment.isMoment(a.Date) ? a.Date.valueOf() : moment.now()) -
          (moment.isMoment(b.Date) ? b.Date.valueOf() : moment.now());
      });
      this.patientForm.form.markAsDirty();
    }
  }

  removeReminder(Reminder: { Name: string, Date: moment.Moment }) {
    if (!this.patient.Reminders) { return; }
    const index = this.patient.Reminders.indexOf(Reminder);

    if (index >= 0) {
      this.patient.Reminders.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }



}
