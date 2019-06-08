import { Observable, Subject, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Patient } from './../services/patient.model';
import { PatientFormatingService} from './../services/patient-formating.service';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less']
})
export class PatientsComponent implements OnInit {

  private searchObserver: Subscriber<{}>;
  public searchString: String = '';

  constructor(public patients: PatientsService, public patientFormat: PatientFormatingService) {
  }

  ngOnInit() {
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
