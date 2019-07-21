import { PatientFormatingService } from './../services/patient-formating.service';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit {

  public searchString = '';
  public _sortOrder = 'normal';
  public _sortBy = 'LastUpdate';

  constructor(
    public patientService: PatientsService,
    public patientFormat: PatientFormatingService,
    private titleService: Title
  ) {
  }

  public patientsView: Observable<{ title: string, patients: { id: string, patient: Patient }[] }[]>;

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς');
    this.patientsView = this.patientService.filteredPatients$.pipe(map(d => {
      const patientsView = [];
      let patients: { id: string, patient: Patient }[] = [];
      let compareString: string;
      d.forEach(n => {
        if (this._sortBy === 'LastName' && !n.patient.LastName.startsWith(compareString)) {
          patients = [];
          compareString = n.patient.LastName.charAt(0);
          patientsView.push({ title: compareString, patients });
        }
        if (this._sortBy === 'FirstName') {
          const firstNameCompareLetter = n.patient.FirstName ? n.patient.FirstName[0] : 'Χωρίς Όνομα';
          if (firstNameCompareLetter !== compareString) {
            patients = [];
            compareString = firstNameCompareLetter;
            patientsView.push({ title: compareString, patients });
          }
        }
        if (this._sortBy === 'Birthdate') {
          const ageDecade = Math.trunc(this.patientFormat.age(n.patient) / 10) * 10;
          let ageDecadeString: string;

          if (isNaN(ageDecade)) {
            ageDecadeString = 'Άγνωστη ημ. γέννησης';
          } else if (ageDecade === 0) {
            ageDecadeString = 'Μικρότερος των 10 ετών';
          } else {
            ageDecadeString = 'Μεγαλύτερος των ' + ageDecade.toString() + 'ετών';
          }

          if (ageDecadeString !== compareString) {
            patients = [];
            compareString = ageDecadeString;
            patientsView.push({ title: compareString, patients });
          }
        }
        if (this._sortBy === 'LastUpdate') {
          const lastUpdateString = 'Τελευταία επίσκεψη ' +
            (n.patient.LastUpdate as moment.Moment).fromNow(false);
          if (lastUpdateString !== compareString) {
            patients = [];
            compareString = lastUpdateString;
            patientsView.push({ title: compareString, patients });
          }
        }
        patients.push(n);
      });
      return patientsView;
    }));
    this.patientsView.subscribe(d => console.log(d));
  }

  public search(value: string): void {
    this.searchString = value;
    this.patientService.FilterBy(value);
  }

  public sortBy(value: string): void {
    this._sortBy = value;
    this.patientService.SortBy(value);
  }

  public sortOrder(value: string): void {
    this._sortOrder = value;
    this.patientService.SortOrder(value);
  }
}
