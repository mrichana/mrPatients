import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Patient } from '../services/patient.model';
import { PatientFormatingService} from '../services/patient-formating.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.less']
})
export class PatientComponent implements OnInit {

  private patientId: string;
  public panelOpenState: Boolean = false;
  public patient: Patient;

  constructor(
    private route: ActivatedRoute,
    public patientFormat: PatientFormatingService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { patient: Patient }) => {
      this.titleService.setTitle('Ασθενείς - ' + this.patientFormat.displayName(data.patient));
      this.patient = data.patient;
    });
  }
}
