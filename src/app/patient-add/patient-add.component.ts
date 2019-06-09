import { Component, OnInit } from '@angular/core';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.less']
})
export class PatientAddComponent implements OnInit {

  public patient: Patient;
  private patientParameters: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    public patientFormat: PatientFormatingService
) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientParameters = params.get('search');
        _this.patient = _this.patientService.createPatient(_this.patientParameters);
      }
    );
  }

}
