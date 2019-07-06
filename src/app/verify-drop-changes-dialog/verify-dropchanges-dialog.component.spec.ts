import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDropChangesDialogComponent } from './verify-drop-changes-dialog.component';

describe('VerifyDropChangesDialogComponent', () => {
  let component: VerifyDropChangesDialogComponent;
  let fixture: ComponentFixture<VerifyDropChangesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDropChangesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDropChangesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
