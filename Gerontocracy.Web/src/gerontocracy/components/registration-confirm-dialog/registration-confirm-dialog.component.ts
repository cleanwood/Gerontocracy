import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-registration-confirm-dialog',
  templateUrl: './registration-confirm-dialog.component.html',
  styleUrls: ['./registration-confirm-dialog.component.scss']
})
export class RegistrationConfirmDialogComponent implements OnInit {

  constructor(private dialogReference: DynamicDialogRef) { }

  ngOnInit() {
  }

  closeConfirmation() {
    this.dialogReference.close();
  }
}
