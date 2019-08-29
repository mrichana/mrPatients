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
import { SurgeryEditDialogComponent } from '../surgery-edit-dialog/surgery-edit-dialog.component';
import { DrugEditDialogComponent} from '../drug-edit-dialog/drug-edit-dialog.component';
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.less']
})
export class PatientEditComponent implements OnInit {

  public patient: Patient;

  @ViewChild('patientForm', { static: false }) public patientForm: NgForm;

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

      const regexDate = /(.*?)(?: *)(?:(?:\(([0-9\/\\\-\.]*)\))?)$/;
      const result = regexDate.exec(value);
      //   return {fulltext: result[0], name: result[1], date: result[2] ? moment(result[2]) : null};
      // });

    this.addSurgeriesCommon(result[1], (result[2] ? moment(result[2]) : undefined));

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  openSurgeryEditDialog() {
    this.dialog.open(SurgeryEditDialogComponent).afterClosed().subscribe((result: { SurgeryName: string, SurgeryDate: moment.Moment }) => {
      if ((result.SurgeryName || '').trim()) {
        this.addSurgeriesCommon(result.SurgeryName.trim() +
          (result.SurgeryDate && result.SurgeryDate.isValid ? ' (' + this.patientFormat.momentToString(result.SurgeryDate) + ')' : ''));
      }
    });
  }

  addSurgeriesCommon(Name: string, Date?: moment.Moment) {
    if ((Name || '').trim()) {
      if (!this.patient.Surgeries) {
        this.patient.Surgeries = [] as {Name: string, Date: moment.Moment}[];
      }
      this.patient.Surgeries.push({Name: Name.trim(), Date: Date});
      this.patient.Surgeries.sort((a, b) => {
        return (moment.isMoment(a.Date) ? a.Date.valueOf() : moment.now()) -
          (moment.isMoment(b.Date) ? b.Date.valueOf() : moment.now());
      });
      this.patientForm.form.markAsDirty();
    }
  }

  removeSurgery(Surgery: {Name: string, Date?: moment.Moment}) {
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

    this.addDrugsCommon(value);

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  openDrugEditDialog() {
    this.dialog.open(DrugEditDialogComponent).afterClosed().subscribe((result: { Name: string, Dosage: string, Frequency: string}) => {
      if ((result.Name || '').trim()) {
        this.addDrugsCommon(result.Name.trim() + (result.Dosage ? ' ' + result.Dosage.trim() : '') +
          (result.Frequency ? ' ' + result.Frequency : ''));
      }
    });
  }

  addDrugsCommon(Drug: string) {
    if ((Drug || '').trim()) {
      if (!this.patient.Drugs) {
        this.patient.Drugs = [] as string[];
      }
      this.patient.Drugs.push(Drug.trim());
      this.patientForm.form.markAsDirty();
    }
  }

  removeDrug(Drug: string) {
    if (!this.patient.Drugs) { return; }
    const index = this.patient.Drugs.indexOf(Drug);

    if (index >= 0) {
      this.patient.Drugs.splice(index, 1);
      this.patientForm.form.markAsDirty();
    }
  }

}
