import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, NotifyService, CodesService } from '../../services';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  taskId: number;
  id: number;
  isAddMode: boolean;
  taskLogForm: FormGroup;
  loading: boolean = false;
  types = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private taskServices: TaskService,
    private codesService: CodesService,
    private notifyServices: NotifyService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.codesService.getLogTypes().subscribe((types) => (this.types = types));
    this.taskId = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params['tid'];
    this.isAddMode = !this.id;

    this.taskLogForm = this.formBuilder.group({
      comment: [, { validators: [Validators.required] }],
      time: ['', { validators: [Validators.required] }],
      taskLogTypeId: [, { validators: [Validators.required] }],
    });

    if (!this.isAddMode) {
      this.taskServices
        .getTaskLogById(this.id)
        .pipe(
          map((task: any) => {
            if (task) {
              task.time = task.time.replace(':00', '');
            }
            return task;
          })
        )
        .subscribe((task) => this.taskLogForm.patchValue(task));
    }
  }

  get f() {
    return this.taskLogForm.controls;
  }

  submitForm() {
    if (this.taskLogForm.invalid) {
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
      .createTaskLog({ taskId: this.taskId, ...this.taskLogForm.value })
      .pipe(first())
      .subscribe({
        next: () => {
          this.notifyServices.success('Task log successfuly created!');
          this._location.back();
        },
        error: (error) => {
          this.notifyServices.error(error);
          this.loading = false;
        },
      });
  }

  private updateTask() {
    this.taskServices
      .updateTaskLog({
        taskId: this.taskId,
        id: this.id,
        ...this.taskLogForm.value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.notifyServices.success('Task log successfuly updated');
          this._location.back();
        },
        error: (error) => {
          this.notifyServices.error(error);
          this.loading = false;
        },
      });
  }
}
