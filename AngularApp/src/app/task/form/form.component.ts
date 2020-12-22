import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, NotifyService, CodesService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  id: number;
  isAddMode: boolean;
  taskForm: FormGroup;
  loading: boolean = false;
  statuses = [];
  priorities = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskServices: TaskService,
    private codesService: CodesService,
    private notifyServices: NotifyService
  ) {}

  ngOnInit(): void {
    this.codesService
      .getStatuses()
      .subscribe((statuses) => (this.statuses = statuses));

    this.codesService
      .getPriorities()
      .subscribe((priorities) => (this.priorities = priorities));

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.taskForm = this.formBuilder.group({
      name: [, { validators: [Validators.required] }],
      description: [],
      taskStatusCodeId: [],
      taskPriorityCodeId: [],
      startDate: [],
      endDate: [],
      note: [],
    });

    if (!this.isAddMode) {
      this.taskServices
        .getTaskById(this.id)
        .pipe(first())
        .subscribe((task) => this.taskForm.patchValue(task));
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  submitForm() {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  private createTask() {
    this.taskServices
      .createTask(this.taskForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notifyServices.success('Task successfuly created!');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.notifyServices.error(error);
          this.loading = false;
        },
      });
  }

  private updateTask() {
    this.taskServices
      .updateTask({ id: this.id, ...this.taskForm.value })
      .pipe(first())
      .subscribe({
        next: () => {
          this.notifyServices.success('Task successfuly updated');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.notifyServices.error(error);
          this.loading = false;
        },
      });
  }
}
