import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-surgery-edit-dialog',
  templateUrl: './surgery-edit-dialog.component.html',
  styleUrls: ['./surgery-edit-dialog.component.less']
})
export class SurgeryEditDialogComponent implements OnInit {

  public surgeryName: string;
  public surgeryDate: moment.Moment;

  constructor(
    public dialogRef: MatDialogRef<SurgeryEditDialogComponent>
  ) {}

  ngOnInit() {
  }

  Today(): Date {
    return new Date();
  }

  Submit() {
    console.log(this.surgeryName);
    console.log(this.surgeryDate);
    this.dialogRef.close({SurgeryName: this.surgeryName, SurgeryDate: this.surgeryDate});
  }
}
