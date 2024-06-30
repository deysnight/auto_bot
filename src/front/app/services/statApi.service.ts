import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ISuccessReturn from '../../../entities/dtos/successReturn.dto.js';
import { eStatsLabel } from '../../../entities/global.enum.js';

@Injectable({
  providedIn: 'root',
})
export class StatApiService {
  protected readonly endpoint: string;
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.endpoint = 'api/stats';
  }

  reset(id: string, name: eStatsLabel): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}/reset`;
    return this.http.post<ISuccessReturn>(endpoint, { name });
  }
}
