import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Patient } from './../services/patient.model';
import { PatientService } from './../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.less']
})
export class PatientComponent implements OnInit {

  private patientId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientId = params.get('id');
        _this.patientService.loadPatient(_this.patientId).subscribe(patient => {
          console.log(patient);
        });
      }
    );
  }
}
