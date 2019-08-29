import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-drug-edit-dialog',
  templateUrl: './drug-edit-dialog.component.html',
  styleUrls: ['./drug-edit-dialog.component.less']
})
export class DrugEditDialogComponent implements OnInit {

  public name: string;
  public type: string;
  public concentration: string;
  public dosage: string;

  constructor(
    public dialogRef: MatDialogRef<DrugEditDialogComponent>
  ) { }

  ngOnInit() {
  }

  public Submit() {
    this.dialogRef.close({
      Name: this.name,
      Type: this.type,
      Concentration: this.concentration,
      Dosage: this.dosage
    });
  }

}
