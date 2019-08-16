import { Component, OnInit } from '@angular/core';
import { DashboardData } from '../../models/dashboard-data';
import { DialogService, MessageService } from 'primeng/api';
import { SharedAccountService } from '../../../shared/services/shared-account.service';
import { Router } from '@angular/router';
import { LoginDialogComponent } from 'Gerontocracy.Web/src/gerontocracy/components/login-dialog/login-dialog.component';
import { DashboardService } from '../../services/dashboard.service';
import { PoliticianSelectionDialogComponent } from '../politician-selection-dialog/politician-selection-dialog.component';
import { NewsData } from '../../models/news-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private sharedAccountService: SharedAccountService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router
  ) { }

  dashboard: DashboardData;

  ngOnInit() {
    this.dashboardService.getDashboardData().toPromise()
      .then(n => this.dashboard = n);
  }

  addAffair(newsId: number) {
    this.sharedAccountService.isLoggedIn().toPromise().then(r => {
      if (r) {
        this.dialogService.open(PoliticianSelectionDialogComponent,
          {
            header: 'Login',
            width: '800px',
            closable: false,
          })
          .onClose
          .subscribe(n => {
            if (n) {
              const data: NewsData = {
                beschreibung: n.beschreibung,
                newsId,
                reputationType: n.reputationType,
                politikerId: n.politikerId
              };

              this.dashboardService
                .generateNews(data)
                .toPromise()
                .then(o => this.showAffair(o))
                .catch(o => this.messageService.add({ severity: 'error', detail: o.message, summary: 'Fehler' }));
            }
          });
      } else {
        this.dialogService.open(LoginDialogComponent,
          {
            header: 'Login',
            width: '407px',
            closable: false,
          })
          .onClose
          .subscribe(n => {
            if (n) {
              window.location.reload();
            }
          });
      }
    });
  }

  showAffair(affairId: number) {
    this.router.navigate([`affair/new/${affairId}`]);
  }
}
