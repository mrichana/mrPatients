import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugEditDialogComponent } from './drug-edit-dialog.component';

describe('DrugEditDialogComponent', () => {
  let component: DrugEditDialogComponent;
  let fixture: ComponentFixture<DrugEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
