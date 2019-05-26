import { Observable, Subject, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Patient } from './../services/patient.model';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less']
})
export class PatientsComponent implements OnInit {

  private searchObserver: Subscriber<{}>;
  public searchString: String = '';

  constructor(public patients: PatientsService) {
  }

  ngOnInit() {
  }

  public encodeURI (URI: string): string {
    return encodeURIComponent(URI);
  }

  public displayName (patient: Patient): string {
    return patient.LastName + ', ' + patient.FirstName;
  }

  public age (patient: Patient): string {
    if (!patient.Birthdate) {return ''; }
    return '(' + moment().diff(patient.Birthdate.toMillis(), 'years').toString() + ')';
  }

  public search (value: string): void {
    this.searchString = value;
    this.patients.FilterBy(value);
  }

  public sortBy (value: string): void {
    this.patients.SortBy(value);
  }

  public sortOrder (value: string): void {
    this.patients.SortOrder(value);
  }

  public addPatient (): void {
    console.log('addPatient');
  }
}
