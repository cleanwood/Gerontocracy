import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from '../models/login';
import { Message } from 'primeng/components/common/message';

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
  burger: MenuItem[] = [];

  isLoading: boolean;
  accountData: User;
  sidebarVisible: boolean;

  loginVisible: boolean;
  registerVisible: boolean;

  isLogingIn: boolean;
  isRegistering: boolean;

  registerError: Message[];
  loginError: Message[];

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.burger = [{
      icon: 'pi pi-bars',
      command: (evt) => this.toggleSidenav()
    }];

    this.loginVisible = false;
    this.registerVisible = false;
    this.isLogingIn = false;
    this.isRegistering = false;

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

  loginUser(evt: any) {
    if (this.loginForm.valid) {
      this.isLogingIn = true;
      this.loginForm.disable();

      const temp = this.loginForm.value;
      const data: Login = {
        name: temp.name,
        password: temp.pass,
        rememberMe: temp.remember
      };

      this.accountService.loginUser(data)
        .toPromise()
        .then(() => {
          this.isLogingIn = false;
          this.loginForm.enable();
          this.loginForm.reset();
          this.loginVisible = false;
        })
        .catch(() => {
          this.loginError.push({ severity: 'error', summary: 'Fehler', detail: this.loginErrorContent.nativeElement.innerText });
          this.isLogingIn = false;
          this.loginForm.enable();
        });
    }
  }

  cancelLogin(): void {

  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]],
      pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      remember: [false],
    });
  }

  private buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')]],
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


/*

    <p-toolbar>
      <div class="ui-toolbar-group-left" style="margin-right: auto">
        <a pButton icon="pi pi-bars" class="geronto_sidenav_toggle" style="margin-right: 3.5px;"
          (click)="sidenav.toggle()">
        </a>
        <a pButton href="/" icon="pi pi-briefcase" label="Gerontocracy" style="margin-right: 3.5px;"
          class="geronto_toolbar_button"></a>
        <a pButton routerLink="/" icon="pi pi-home" label="Home" style="margin-right: 3.5px;"
          class="geronto_toolbar_button" routerLinkActive="active"></a>
        <a pButton routerLink="/party" label="Parteiübersicht" icon="pi pi-users" style="margin-right: 3.5px;"
          class="geronto_toolbar_button" routerLinkActive="active">
        </a>
        <a pButton routerLink="/affair" label="Vorfälle" icon="pi pi-folder-open" style="margin-right: 3.5px;"
          class="geronto_toolbar_button" routerLinkActive="active">
        </a>
        <a pButton routerLink="/board" icon="pi pi-comments" class="geronto_toolbar_button" style="margin-right: 3.5px;"
          label="Boards" routerLinkActive="active"></a>
        <a pButton routerLink="/admin" icon="pi pi-cog" label="Administration" class="geronto_toolbar_button"
          routerLinkActive="active" *ngIf="isAdmin"></a>
      </div>

      <div class="ui-toolbar-group-right">
        <!-- <span *ngIf="!accountData">-->
        <button pButton label="Login" icon="pi pi-signin" (click)="login($event)" style="margin-right: 3.5px;"></button>
        <button pButton label="Registrieren" icon="pi pi-user-plus" (click)="signup($event)"></button>

        <button pButton [matMenuTriggerFor]="menu">
          UserName
          <mat-icon>face</mat-icon>
        </button>

        <!-- {{accountData.userName}} -->
        <!-- <span *ngIf="accountData"> -->
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="logout($event)">
            <mat-icon>close</mat-icon>Logout
          </button>
        </mat-menu>

        <!--  </span> -->



        </span> -->
      </div>

    </p-toolbar>
*/
