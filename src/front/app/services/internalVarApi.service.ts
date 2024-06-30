import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ISuccessReturn from '../../../entities/dtos/successReturn.dto.js';
import ITaskCustomVar from '../../../entities/ientities/icustomvar.entity.js';

@Injectable({
  providedIn: 'root',
})
export class IntervalVarApiService {
  protected readonly endpoint: string;
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.endpoint = 'api/internalvars';
  }

  update(id: string, internalVar: ITaskCustomVar): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.post<ISuccessReturn>(endpoint, internalVar);
  }

  reset(id: string, internalVarName: string): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}/reset`;
    return this.http.post<ISuccessReturn>(endpoint, { name: internalVarName });
  }

  delete(id: string, internalVarName: string): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.delete<ISuccessReturn>(endpoint, {
      body: { name: internalVarName },
    });
  }
}
