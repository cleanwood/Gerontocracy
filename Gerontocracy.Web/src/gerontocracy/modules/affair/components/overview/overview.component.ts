import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VorfallOverview } from '../../models/vorfall-overview';
import { VorfallDetail } from '../../models/vorfall-detail';
import { AffairService } from '../../services/affair.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, DialogService } from 'primeng/api';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { SharedAccountService } from '../../../shared/services/shared-account.service';
import { LoginDialogComponent } from '../../../../components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [DialogService]
})
export class OverviewComponent implements OnInit {

  popupVisible: boolean;
  pageSize = 25;
  maxResults = 0;
  pageIndex = 0;
  searchForm: FormGroup;
  data: VorfallOverview[];
  detailData: VorfallDetail;
  isLoadingData = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private affairService: AffairService,
    private sharedAccountService: SharedAccountService,
    private messageService: MessageService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.popupVisible = false;

    this.searchForm = this.formBuilder.group({
      title: [''],
      lastName: [''],
      firstName: [''],
      party: ['']
    });

    this.activatedRoute.params.subscribe(n => {
      const id = +n.id;
      if (id) {
        this.showDetail(id);
      }
    });

    this.loadData();
  }

  loadData(): void {
    this.isLoadingData = true;
    this.affairService.search(this.searchForm.value, this.pageSize, this.pageIndex)
      .toPromise()
      .then(n => {
        this.data = n.data;
        this.maxResults = n.maxResults;
        this.isLoadingData = false;
      })
      .catch(n => this.messageService.add({ severity: 'error', summary: n.name, detail: n.Message }));
  }

  showPopup(): void {
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
  }

  showDetail(id: number) {
    this.detailData = null;
    this.location.replaceState(`/affair/new/${id}`);
    this.affairService.getAffairDetail(id)
      .toPromise()
      .then(n => this.detailData = n)
      .catch(n => this.messageService.add({ severity: 'error', summary: n.name, detail: n.Message }));
  }

  addAffair() {
    this.sharedAccountService.isLoggedIn().toPromise().then(n => {
      if (n) {
        this.dialogService.open(AddDialogComponent, {
          closable: false,
          header: 'Neuen Vorfall einreichen',
          width: '800px',
        });
      } else {
        this.dialogService.open(LoginDialogComponent,
          {
            header: 'Login',
            width: '407px',
            closable: false,
          })
          .onClose
          .subscribe(m => {
            if (m) {
              window.location.reload();
            }
          });
      }
    });
  }

  paginate(evt: any) {
    this.pageIndex = evt.page;
    this.pageSize = evt.rows;
    this.loadData();
  }
}
