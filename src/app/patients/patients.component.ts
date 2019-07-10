import { PatientFormatingService } from './../services/patient-formating.service';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import * as moment from 'moment';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less']
})
export class PatientsComponent implements OnInit {

  public searchString = '';
  public _sortOrder = 'normal';
  public _sortBy = 'LastUpdate';

  constructor(private patientService: PatientsService, public patientFormat: PatientFormatingService, private titleService: Title) {
  }

  public patientsView: { title: string, patients: { id: string, patient: Patient }[] }[];

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς');
    this.patientService.filteredPatients$.subscribe(d => {
      this.patientsView = [];
      let patients: { id: string, patient: Patient }[] = [];
      let compareString: string;
      d.forEach(n => {
        if (this._sortBy === 'LastName' && !n.patient.LastName.startsWith(compareString)) {
          patients = [];
          compareString = n.patient.LastName.charAt(0);
          this.patientsView.push({ title: compareString, patients });
        }
        if (this._sortBy === 'FirstName') {
          const firstNameCompareLetter = n.patient.FirstName ? n.patient.FirstName[0] : 'Χωρίς Όνομα';
          if (firstNameCompareLetter !== compareString) {
            patients = [];
            compareString = firstNameCompareLetter;
            this.patientsView.push({ title: compareString, patients });
          }
        }
        if (this._sortBy === 'Birthdate') {
          const ageDecade = Math.trunc(this.patientFormat.age(n.patient) / 10) * 10;
          let ageDecadeString: string;

          if (isNaN(ageDecade)){
            ageDecadeString = 'Άγνωστη ημ. γέννησης';
          } else if (ageDecade === 0 ) {
            ageDecadeString = 'Μικρότερος των 10 ετών';
          } else {
            ageDecadeString = 'Μεγαλύτερος των ' + ageDecade.toString() + 'ετών';
          }

          if (ageDecadeString !== compareString) {
            patients = [];
            compareString = ageDecadeString;
            this.patientsView.push({ title: compareString, patients });
          }
        }
        if (this._sortBy === 'LastUpdate') {
          const lastUpdateString = 'Τελευταία επίσκεψη ' +
            this.patientFormat.timestampToMoment(n.patient.LastUpdate as firebase.firestore.Timestamp).fromNow(false);
          if (lastUpdateString !== compareString) {
            patients = [];
            compareString = lastUpdateString;
            this.patientsView.push({ title: compareString, patients });
          }
        }
        patients.push(n);
      });
    });
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
