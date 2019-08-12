import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GerontocracyRoutingModule } from './gerontocracy-routing.module';
import { GerontocracyComponent } from './components/gerontocracy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmemailComponent } from './components/confirmemail/confirmemail.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    GerontocracyComponent,
    RegisterComponent,
    ConfirmemailComponent,
    LoginComponent
  ],
  imports: [
    GerontocracyRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    HttpClientModule,

    SidebarModule,
    ToolbarModule,
    ButtonModule,
    ProgressSpinnerModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    CardModule,
    DialogModule,
    InputTextModule,
    MessagesModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [GerontocracyComponent]
})
export class AppModule { }
