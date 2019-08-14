import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffairComponent } from './components/affair.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AffairRoutingModule } from './affair-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { AddComponent } from './components/add/add.component';

import { AffairService } from './services/affair.service';

import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { FieldsetModule } from 'primeng/fieldset';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AffairComponent,
    OverviewComponent,
    AddComponent,
    DetailviewComponent
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

    SharedModule
  ],
  providers: [
    MessageService,
    AffairService
  ]
})
export class AffairModule { }
