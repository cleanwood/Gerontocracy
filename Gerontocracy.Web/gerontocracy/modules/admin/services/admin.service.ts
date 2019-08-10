import { Injectable } from '@angular/core';
import { SearchParams } from '../models/search-params';
import { UserOverview } from '../models/user-overview';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../models/search-result';
import { UserDetail } from '../models/user-detail';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public roles: Role[];

  constructor(
    private httpClient: HttpClient
  ) {
    this.refreshRoles();
  }

  refreshRoles(): void {
    this.httpClient.get<Role[]>(`api/admin/roles`)
      .toPromise()
      .then(n => this.roles = n);
  }

  setUserRoles(userId: number, roleIds: number[]): Observable<void> {
    return this.httpClient.post<void>(`api/admin/set-roles`, { userId, roleIds });
  }

  search(params: SearchParams, pageSize: number, pageIndex: number): Observable<SearchResult> {
    const request = `api/admin/usersearch?`
      + `username=${params.userName}&`
      + `pagesize=${pageSize}&`
      + `pageindex=${pageIndex}`;

    return this.httpClient.get<SearchResult>(request);
  }

  getUserDetail(id: number) {
    return this.httpClient.get<UserDetail>(`api/admin/user/${id}`);
  }
}
