import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { ThreadOverview } from '../../models/thread-overview';
import { ThreadDetail } from '../../models/thread-detail';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private messageService: MessageService
  ) { }

  pageSize = 25;
  maxResults = 0;
  pageIndex = 0;

  data: ThreadOverview[];
  detailData: ThreadDetail;

  isLoadingData: boolean;

  popupVisible: boolean;

  searchForm: FormGroup;

  ngOnInit() {
    this.popupVisible = false;

    this.searchForm = this.formBuilder.group({
      title: [''],
    });

    this.activatedRoute.params.subscribe(n => {
      const id = +n.id;
      if (id) {
        this.showDetail(id);
      }
    });

    this.loadData();
  }

  paginate(evt: any) {
    this.pageIndex = evt.page;
    this.pageSize = evt.rows;
    this.loadData();
  }

  loadData(): void {
    this.pageIndex = 0;
    this.maxResults = 0;
    this.isLoadingData = true;
    this.boardService.search(this.searchForm.value, this.pageSize, this.pageIndex)
      .toPromise()
      .then(n => {
        this.data = n.data;
        this.maxResults = n.maxResults;
        this.isLoadingData = false;
      })
      .catch(n => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: n.message }));
  }

  showDetail(id: number) {
    this.detailData = null;

    this.location.replaceState(`thread/new/${id}`);

    this.boardService.getThread(id)
      .toPromise()
      .then(n => this.detailData = n)
      .catch(n => this.messageService.add({ severity: 'error', summary: n.name, detail: n.Message }));
  }

  getThreadTitle(row: ThreadOverview): string {
    let result = row.titel;

    if (row.vorfallTitel !== row.titel) {
      result = `${result}/${row.vorfallTitel}`;
    }

    return result;
  }
}
