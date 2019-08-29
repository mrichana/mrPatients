import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';
import { Title } from '@angular/platform-browser';
import { Patient } from '../services/patient.model';
import { PatientService } from '../services/patient.service';
import { PatientFormatingService } from '../services/patient-formating.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { VerifyDropChangesDialogComponent } from '../verify-drop-changes-dialog/verify-drop-changes-dialog.component';
import { SurgeryEditDialogComponent } from '../surgery-edit-dialog/surgery-edit-dialog.component';

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

