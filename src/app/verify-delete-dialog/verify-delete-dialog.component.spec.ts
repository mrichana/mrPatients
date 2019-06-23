import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeleteDialogComponent } from './verify-delete-dialog.component';

describe('VerifyDeleteDialogComponent', () => {
  let component: VerifyDeleteDialogComponent;
  let fixture: ComponentFixture<VerifyDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
