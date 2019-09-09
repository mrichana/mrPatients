import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderEditDialogComponent } from './reminder-edit-dialog.component';

describe('ReminderEditDialogComponent', () => {
  let component: ReminderEditDialogComponent;
  let fixture: ComponentFixture<ReminderEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
