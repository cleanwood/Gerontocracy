import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffairComponent } from './components/affair.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AffairRoutingModule } from './affair-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { AffairService } from './services/affair.service';
import { SharedModule } from '../shared/shared.module';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { SourceDialogComponent } from './components/source-dialog/source-dialog.component';

import { MessageService, DialogService, DynamicDialogRef } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [
    AffairComponent,
    OverviewComponent,
    DetailviewComponent,
    AddDialogComponent,
    SourceDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AffairRoutingModule,

    PanelModule,
    PaginatorModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    BlockUIModule,
    FieldsetModule,
    InputTextareaModule,
    AutoCompleteModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,

    SharedModule
  ],
  entryComponents: [
    SourceDialogComponent,
    AddDialogComponent
  ],
  providers: [
    MessageService,
    AffairService,
    MessageService,
    DialogService,
    DynamicDialogRef
  ]
})
export class AffairModule { }
