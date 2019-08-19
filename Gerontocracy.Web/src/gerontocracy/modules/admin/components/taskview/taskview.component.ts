import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute, ResolveStart } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  isAdmin: boolean;

  searchForm: FormGroup;

  popupVisible: boolean;

  pageSize = 25;
  maxResults = 0;
  pageIndex = 0;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.isAdmin = false;

    this.accountService
      .getCurrentUser()
      .toPromise()
      .then(n => {
        const roles: string[] = n.roles;
        if (roles.includes('admin') || roles.includes('moderator')) {
          this.isAdmin = true;
        } else {
          this.router.navigate(['/']);
        }
        this.popupVisible = false;

        this.searchForm = this.formBuilder.group({
          userName: ['']
        });

        this.activatedRoute.params.subscribe(n => {
          const id = +n.id;
          if (id) {
            this.showDetail(id);
          }
        });

        this.loadData();
      });
  }

  showDetail(id: number) {
    // this.detailData = null;

    // this.adminService.getUserDetail(id)
    //   .toPromise()
    //   .then(n => this.detailData = n)
    //   .catch(n => this.messageService.add({ severity: 'error', detail: n.Message, summary: 'Fehler' }));
  }

  loadData(): void {
    this.pageIndex = 0;
    this.maxResults = 0;
    // this.adminService.search(this.searchForm.value, this.pageSize, this.pageIndex)
    //   .toPromise()
    //   .then(n => {
    //     // this.data = n.data;
    //     this.maxResults = n.maxResults;
    //   })
    //   .catch(n => this.messageService.add({ severity: 'error', detail: n.Message, summary: 'Fehler' }));
  }
}
