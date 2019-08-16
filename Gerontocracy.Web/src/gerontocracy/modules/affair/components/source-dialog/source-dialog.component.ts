import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SourceDialogData } from './source-dialog-data';
import { QuelleAdd } from '../../models/quelle-add';

@Component({
  selector: 'app-source-dialog',
  templateUrl: './source-dialog.component.html',
  styleUrls: ['./source-dialog.component.scss']
})
export class SourceDialogComponent implements OnInit {

  formGroup: FormGroup;

  private index: number;
  private readonly regex = '((https?://)|(http?://))([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
  ) {
    dialogConfig.header = `Quelle ${dialogConfig.data ? 'bearbeiten' : 'hinzufügen'}`;
  }

  ngOnInit() {
    this.index = -1;
    this.formGroup = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern(this.regex)]],
      zusatz: ['', [Validators.required, Validators.maxLength(255)]]
    });

    if (this.dialogConfig.data) {
      this.formGroup.setValue(this.dialogConfig.data.source);
      this.index = this.dialogConfig.data.index;
    }
  }

  onTestUrlClicked() {
    if (this.formGroup.controls.url.valid) {
      window.open(this.formGroup.controls.url.value, '_blank');
    }
  }

  onSaveClicked() {
    this.formGroup.markAsDirty();

    if (this.formGroup.valid) {
      const result: SourceDialogData = {
        index: this.index,
        source: this.formGroup.value as QuelleAdd
      };

      this.dialogRef.close(result);
    }
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
