import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';
import { Title } from '@angular/platform-browser';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-patient-add',
  templateUrl: '../patient-edit/patient-edit.component.html',
  styleUrls: ['../patient-edit/patient-edit.component.less']
})
export class PatientAddComponent extends PatientEditComponent implements OnInit {

  private patientParameters: string;

  constructor(
    public patientFormat: PatientFormatingService,
    protected route: ActivatedRoute,
    protected patientService: PatientService,
    protected router: Router,
    protected dialog: MatDialog,
    protected titleService: Title
  ) {
    super(
      patientFormat,
      route,
      patientService,
      router,
      dialog,
      titleService,
    );
  }

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς - Νέος');
    const _this = this;
    _this.route.paramMap.subscribe(
      (params: ParamMap) => {
        _this.patientParameters = params.get('search');
        _this.patient = _this.patientService.createPatient(_this.patientParameters);
      }
    );
  }

  notesEditorCreated(editor) {
    return;
  }
}

