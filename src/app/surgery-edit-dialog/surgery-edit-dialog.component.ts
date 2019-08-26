import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-surgery-edit-dialog',
  templateUrl: './surgery-edit-dialog.component.html',
  styleUrls: ['./surgery-edit-dialog.component.less']
})
export class SurgeryEditDialogComponent implements OnInit {

  public surgeryName: string;
  public surgeryDate: moment.Moment;

  constructor() { }

  ngOnInit() {
  }

  Today(): Date {
    return new Date();
  }



}
