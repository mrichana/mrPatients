import { Subscriber } from 'rxjs';
import { PatientFormatingService} from './../services/patient-formating.service';
import { PatientsService } from './../services/patients.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less']
})
export class PatientsComponent implements OnInit {

  private searchObserver: Subscriber<{}>;
  public searchString: String = '';

  constructor(public patients: PatientsService, public patientFormat: PatientFormatingService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς - Λίστα');
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
}
