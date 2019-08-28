import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryEditDialogComponent } from './surgery-edit-dialog.component';

describe('SurgeryEditDialogComponent', () => {
  let component: SurgeryEditDialogComponent;
  let fixture: ComponentFixture<SurgeryEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
