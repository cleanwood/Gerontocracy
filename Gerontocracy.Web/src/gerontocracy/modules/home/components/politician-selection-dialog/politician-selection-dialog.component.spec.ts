import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticianSelectionDialogComponent } from './politician-selection-dialog.component';

describe('PoliticianSelectionDialogComponent', () => {
  let component: PoliticianSelectionDialogComponent;
  let fixture: ComponentFixture<PoliticianSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticianSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticianSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
