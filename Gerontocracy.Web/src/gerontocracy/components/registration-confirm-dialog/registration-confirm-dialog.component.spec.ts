import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationConfirmDialogComponent } from './registration-confirm-dialog.component';

describe('RegistrationConfirmDialogComponent', () => {
  let component: RegistrationConfirmDialogComponent;
  let fixture: ComponentFixture<RegistrationConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
