import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import $axios from '../general/axios/axios';

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  constructor() {}

  getStatuses(): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('codes/task-statuses')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getPriorities(): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('codes/task-priorities')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getLogTypes(): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('codes/tasklog-types')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
