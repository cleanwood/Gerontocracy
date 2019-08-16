import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { PoliticianSelectionDialogComponent } from './components/politician-selection-dialog/politician-selection-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { PanelModule } from 'primeng/panel';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    PoliticianSelectionDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    PanelModule,
    HttpClientModule,

    ButtonModule,
    DialogModule,
    InputTextModule,
    AutoCompleteModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    PanelModule,
    RadioButtonModule,

    SharedModule
  ],
  providers: [
    DialogService,
    MessageService,
  ],
  entryComponents: [
    PoliticianSelectionDialogComponent
  ]
})
export class HomeModule { }
