import { Component, OnInit } from '@angular/core';
import { TaskService, NotifyService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  task = null;
  id: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private _notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadTask();
  }

  deleteTaskLog(id: number) {
    this.taskService.deleteTaskLog(id).subscribe(() => {
      this.loadTask();
      this._notifyService.success('Task log deleted sucessfuly!');
    });
  }

  loadTask() {
    this.taskService
      .getTaskById(this.id)
      .pipe(
        map((task: any) => {
          if (task.taskLogs) {
            task.taskLogs = task.taskLogs.map((a) => {
              a.time = a.time.replace(':00', '');
              return a;
            });
          }
          return task;
        })
      )
      .subscribe((task) => (this.task = task));
  }
}
