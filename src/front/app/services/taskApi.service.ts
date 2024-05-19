import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ISummaryTask from '../../../entities/dtos/taskSummary.dto.js';

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

  // getById(id: IEntity['id']): Observable<TEntity> {
  //   const endpoint = `${this.baseEndpoint}/${id}`;
  //   return this.http.get<TEntity>(endpoint);
  // }

  // update(entity: TEntity): Observable<TEntity> {
  //   return this.http.put<TEntity>(this.baseEndpoint, entity);
  // }

  // delete(id: number): Observable<TEntity> {
  //   const endpoint = `${this.baseEndpoint}/${id}`;
  //   return this.http.delete<TEntity>(endpoint);
  // }
}
