import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from '../models/login';
import { Message } from 'primeng/components/common/message';
import { Register } from '../models/register';

@Component({
  selector: 'app-root',
  templateUrl: './gerontocracy.component.html',
  styleUrls: ['./gerontocracy.component.scss']
})
export class GerontocracyComponent implements OnInit {
  @ViewChild('registrationTitle', { static: false }) registrationTitle: ElementRef;
  @ViewChild('registrationContent', { static: false }) registrationContent: ElementRef;
  @ViewChild('errorTitle', { static: false }) errorTitle: ElementRef;
  @ViewChild('errorMessage', { static: false }) errorMessage: ElementRef;
  @ViewChild('loginErrorContent', { static: false }) loginErrorContent: ElementRef;

  items: MenuItem[] = [];
  userMenu: MenuItem[] = [];
  burger: MenuItem[] = [];

  isLoading: boolean;
  accountData: User;
  sidebarVisible: boolean;

  loginForm: FormGroup;
  loginError: Message[];
  isLogingIn: boolean;
  loginVisible: boolean;
  rememberMe: boolean;

  registerForm: FormGroup;
  registerError: Message[];
  isRegistering: boolean;
  registerVisible: boolean;
  checkUsernameAvailability: boolean;
  checkEmailAvailability: boolean;

  registerConfirmVisible: boolean;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder) {
  }

  get isDialogOpen(): boolean {
    return this.registerVisible || this.registerConfirmVisible || this.loginVisible;
  }

  ngOnInit() {
    this.loginVisible = false;
    this.registerVisible = false;
    this.isLogingIn = false;
    this.isRegistering = false;
    this.registerConfirmVisible = false;
    this.rememberMe = false;

    this.burger = [{
      icon: 'pi pi-bars',
      command: (evt) => this.toggleSidenav()
    }];

    this.userMenu = [{
      label: 'Logout',
      command: () => this.logout(),
      icon: 'pi pi-sign-out'
    }];

    this.isLoading = true;
    this.accountService
      .getCurrentUser()
      .toPromise()
      .then(n => this.accountData = n)
      .then(() => {
        this.items = [
          {
            label: 'Gerontocracy',
            icon: 'pi pi-briefcase',
            url: '/'
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/'
          },
          {
            label: 'Parteiübersicht',
            icon: 'pi pi-users',
            routerLink: '/party'
          },
          {
            label: 'Vorfälle',
            icon: 'pi pi-folder-open',
            routerLink: '/affair'
          },
          {
            label: 'Boards',
            icon: 'pi pi-comments',
            routerLink: '/board'
          }
        ];
      })
      .then(() => this.isLoading = false)
      .catch(() => this.accountData = null)
      .then(() => this.isLoading = false);

    this.buildLoginForm();
    this.buildRegisterForm();
  }

  toggleSidenav(): void {
    this.sidebarVisible = true;
  }

  login(): void {
    this.loginVisible = true;
  }

  signup(): void {
    this.registerVisible = true;
  }

  checkboxChanged(value: boolean) {
    this.rememberMe = value;
  }

  logout() {
    this.accountService
      .logoutUser()
      .toPromise()
      .then(() => location.reload());
  }

  loginUser(evt: any) {
    console.log(this.rememberMe);
    if (this.loginForm.valid) {
      this.isLogingIn = true;
      this.loginForm.disable();

      const temp = this.loginForm.value;
      const data: Login = {
        name: temp.name,
        password: temp.pass,
        rememberMe: this.rememberMe
      };

      this.accountService.loginUser(data)
        .toPromise()
        .then(() => {
          this.isLogingIn = false;
          this.closeLoginForm();
          location.reload();
        })
        .catch(() => {
          this.loginError.push({ severity: 'error', summary: 'Fehler', detail: this.loginErrorContent.nativeElement.innerText });
          this.isLogingIn = false;
          this.loginForm.enable();
        });
    }
  }

  closeLoginForm(): void {
    this.loginForm.enable();
    this.loginForm.reset();
    this.loginVisible = false;
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
          this.closeRegisterForm();
          this.registerConfirmVisible = true;
        })
        .catch(() => {
          this.isRegistering = false;
          this.registerForm.enable();
        });
    }
  }

  closeRegisterForm() {
    this.registerForm.enable();
    this.registerForm.reset();
    this.registerVisible = false;
  }

  closeConfirmation() {
    this.registerConfirmVisible = false;
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]],
      pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });
  }

  private buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]],
      mail: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      pass1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      pass2: ['', [Validators.required, this.passwordConfirming]]
    });
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