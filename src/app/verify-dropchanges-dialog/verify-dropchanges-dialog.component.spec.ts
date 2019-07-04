import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDropchangesDialogComponent } from './verify-dropchanges-dialog.component';

describe('VerifyDropchangesDialogComponent', () => {
  let component: VerifyDropchangesDialogComponent;
  let fixture: ComponentFixture<VerifyDropchangesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDropchangesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDropchangesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
