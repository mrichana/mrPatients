import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reminder-edit-dialog',
  templateUrl: './reminder-edit-dialog.component.html',
  styleUrls: ['./reminder-edit-dialog.component.less']
})
export class ReminderEditDialogComponent implements OnInit {

  public reminderName: string;
  public reminderDate: moment.Moment;

  constructor(
    public dialogRef: MatDialogRef<ReminderEditDialogComponent>
  ) {}

  ngOnInit() {
  }

  Today(): Date {
    return new Date();
  }

  Submit() {
    this.dialogRef.close({reminderName: this.reminderName, reminderDate: this.reminderDate});
  }
}
