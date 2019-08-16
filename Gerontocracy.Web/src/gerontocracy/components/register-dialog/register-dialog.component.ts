import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Message, DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { Register } from '../../models/register';
import { RegistrationConfirmDialogComponent } from '../registration-confirm-dialog/registration-confirm-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerError: Message[];
  isRegistering: boolean;
  checkUsernameAvailability: boolean;
  checkEmailAvailability: boolean;

  constructor(
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.buildRegisterForm();
  }

  private buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]],
      mail: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      pass1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      pass2: ['', [Validators.required, this.passwordConfirming]]
    });
  }

  checkUserExists() {
    if (!!this.registerForm.controls.name.value && !this.registerForm.controls.name.errors) {
      this.checkUsernameAvailability = true;

      this.accountService.getUserExists(this.registerForm.controls.name.value)
        .toPromise()
        .then(n => {

          if (n) {
            this.registerForm.controls.name.setErrors({ alreadyInUse: true });
          }

          this.checkUsernameAvailability = false;
        });
    }
  }

  checkEmailExists() {
    if (!!this.registerForm.controls.mail.value && !this.registerForm.controls.mail.errors) {
      this.checkEmailAvailability = true;

      this.accountService.getEmailExists(this.registerForm.controls.mail.value)
        .toPromise()
        .then(n => {

          if (n) {
            this.registerForm.controls.mail.setErrors({ alreadyInUse: true });
          }

          this.checkEmailAvailability = false;
        });
    }
  }

  closeRegisterForm(reloadScreen: boolean) {
    this.dialogRef.close(reloadScreen);
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.isRegistering = true;
      this.registerForm.disable();

      const temp = this.registerForm.value;
      const data: Register = {
        email: temp.mail,
        name: temp.name,
        password: temp.pass1
      };

      this.accountService.registerUser(data)
        .toPromise()
        .then(() => {
          this.isRegistering = false;
          this.dialogService.open(RegistrationConfirmDialogComponent,
            {
              width: '300px',
              header: 'Registrierung erfolgreich',
              closable: false,
            }).onClose.toPromise().then(() => this.closeRegisterForm(true));
        })
        .catch(() => {
          this.isRegistering = false;
          this.registerForm.enable();
        });
    }
  }

  private passwordConfirming(control: FormControl) {
    if (!(control.root as FormGroup).controls) {
      return null;
    }

    const pass = (control.root as FormGroup).controls.pass1.value;
    const confirmPass = (control.root as FormGroup).controls.pass2.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
