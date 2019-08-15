import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../models/search-result';
import { VorfallDetail } from '../models/vorfall-detail';
import { VorfallAdd } from '../models/vorfall-add';
import { SearchParams } from '../models/search-params';
import { VoteType } from '../models/vote-type';

@Injectable({
  providedIn: 'root'
})
export class AffairService {

  constructor(private httpClient: HttpClient) { }

  public search(params: SearchParams, pageSize: number, pageIndex: number): Observable<SearchResult> {
    const request = `api/affair/affairsearch?`
      + `title=${params.title}&`
      + `lastname=${params.lastName}&`
      + `firstname=${params.firstName}&`
      + `party=${params.party}&`
      + `pagesize=${pageSize}&`
      + `pageindex=${pageIndex}`;

    return this.httpClient.get<SearchResult>(request);
  }

  public getAffairDetail(id: number): Observable<VorfallDetail> {
    return this.httpClient.get<VorfallDetail>(`api/affair/vorfalldetail/${id}`);
  }

  public vote(vorfallId: number, voteType: VoteType) {
    return this.httpClient.post<void>(`api/affair/vote`, { vorfallId, voteType });
  }

  public addAffair(obj: VorfallAdd): Observable<number> {
    return this.httpClient.post<number>(`api/affair/vorfall`, obj);
  }
}