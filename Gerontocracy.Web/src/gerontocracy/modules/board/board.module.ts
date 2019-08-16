import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardRoutingModule } from './board-routing.module';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { TreeModule } from 'primeng/tree';

import { SharedModule } from '../shared/shared.module';
import { MessageService, DialogService } from 'primeng/api';
import { BoardService } from './services/board.service';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    BoardComponent,
    OverviewComponent,
    AddDialogComponent,
    DetailviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BoardRoutingModule,

    CardModule,
    PanelModule,
    PaginatorModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    BlockUIModule,
    TreeModule,
    DynamicDialogModule,
    AutoCompleteModule,
    MessagesModule,
    MessageModule,

    SharedModule
  ],
  providers: [
    MessageService,
    BoardService,
    DialogService
  ],
  entryComponents: [
    AddDialogComponent
  ],
})
export class BoardModule { }
