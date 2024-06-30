import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ISummaryTask from '../../../entities/dtos/taskSummary.dto.js';
import ITaskFull from '../../../entities/dtos/taskFull.dto.js';
import ITaskCore from '../../../entities/dtos/taskCore.dto.js';
import ISuccessReturn from '../../../entities/dtos/successReturn.dto.js';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  protected readonly endpoint: string;
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.endpoint = 'api/tasks';
  }

  get(): Observable<ISummaryTask[]> {
    return this.http.get<ISummaryTask[]>(this.endpoint);
  }

  getFull(id: string): Observable<ITaskFull> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<ITaskFull>(endpoint);
  }

  update(id: string, payload: ITaskCore): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.post<ISuccessReturn>(endpoint, payload);
  }

  enable(id: string, state: boolean): Observable<ISuccessReturn> {
    const endpoint = `${this.endpoint}/${id}/state`;
    return this.http.post<ISuccessReturn>(endpoint, { state });
  }
}
