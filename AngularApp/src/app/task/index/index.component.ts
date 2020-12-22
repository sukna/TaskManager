import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, NotifyService } from '../../services';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private taskServices: TaskService,
    private notifyService: NotifyService
  ) {}

  tasks = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskServices.getAlTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  createTask() {
    this.router.navigate(['/task-add']);
  }

  deleteTask(id: number) {
    this.taskServices.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.notifyService.success('Task deleted sucessfuly!');
    });
  }
}
