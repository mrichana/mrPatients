import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Patient } from './../services/patient.model';
import { PatientService } from './../services/patient.service';
import { PatientFormatingService} from './../services/patient-formating.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.less']
})
export class PatientComponent implements OnInit {

  private patientId: string;
  public patient$: Observable<Patient>;
  public panelOpenState: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    public patientFormat: PatientFormatingService,
    private titleService: Title
  ) { }

  ngOnInit() {
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientId = params.get('id');
        _this.patient$ = _this.patientService.loadPatient(_this.patientId);
        _this.patient$.subscribe(d => {
          _this.titleService.setTitle('Ασθενείς - ' + _this.patientFormat.displayName(d));
        });
      }
    );
  }
}
