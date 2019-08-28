import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOverview } from '../../admin/models/user-overview';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient: HttpClient) { }

public getUserOverView(id: number): Observable<UserOverview> {
  return this.httpClient.get<UserOverview>(``);
}

}
