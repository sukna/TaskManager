import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import $axios from '../general/axios/axios';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getAlTasks(): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('task/get-all')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  getTaskById(id: number): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('task/get-by-id/' + id)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  createTask(task: any): Observable<any> {
    return new Observable((observer) => {
      $axios
        .post('task', task)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  deleteTask(id: number) {
    return new Observable((observer) => {
      $axios
        .delete('task/' + id)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  updateTask(task: any): Observable<any> {
    return new Observable((observer) => {
      $axios
        .put('task', task)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getTaskLogById(id: number): Observable<any> {
    return new Observable((observer) => {
      $axios
        .get('taskLog/' + id)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  createTaskLog(taskLog: any): Observable<any> {
    return new Observable((observer) => {
      $axios
        .post('taskLog', taskLog)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  deleteTaskLog(id: number) {
    return new Observable((observer) => {
      $axios
        .delete('taskLog/' + id)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  updateTaskLog(task: any): Observable<any> {
    return new Observable((observer) => {
      $axios
        .put('taskLog', task)
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
