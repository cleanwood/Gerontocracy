import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchParams } from '../../models/search-params';
import { VorfallOverview } from '../../models/vorfall-overview';
import { VorfallDetail } from '../../models/vorfall-detail';
import { AffairService } from '../../services/affair.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
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
    private activatedRoute: ActivatedRoute,
    private affairService: AffairService,
    private messageService: MessageService,
    private router: Router) { }

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
    this.pageIndex = 0;
    this.maxResults = 0;
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

  // showVorfall(id: number) {
  //   this.router.navigate([`affair/new/${id}`]);
  // }

  showPopup(): void {
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
  }

  showDetail(id: number) {
    this.detailData = null;

    this.affairService.getAffairDetail(id)
      .toPromise()
      .then(n => this.detailData = n)
      .catch(n => this.messageService.add({ severity: 'error', summary: n.name, detail: n.Message }));
  }

  paginate(evt: any) {
    this.pageIndex = evt.page;
    this.pageSize = evt.rows;
    this.loadData();
  }
}
