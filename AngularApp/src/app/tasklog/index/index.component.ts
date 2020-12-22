import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService, NotifyService } from '../../services';

@Component({
  selector: 'task-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'time',
    'comment',
    'taskLogType',
    'actions',
  ];

  private _data: any;

  @Output() deleteTaskLog = new EventEmitter();

  @Input() set data(value: any) {
    this._data = value;
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
  }
  get data(): any {
    return this._data;
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: DialogService,
    private _notifyService: NotifyService
  ) {}

  delete(id) {
    this._dialogService
      .openDialog(
        'Deleting task log',
        'Are you sure that you want to delete task log?'
      )
      .subscribe((confirmation) => {
        if (confirmation) {
          this.deleteTaskLog.emit(id);
        }
      });
  }

  edit(taskId) {
    this.router.navigate([
      '/tasklog-form/',
      this.route.snapshot.params['id'],
      taskId,
    ]);
  }
  create() {
    this.router.navigate(['/tasklog-form', this.route.snapshot.params['id']]);
  }
}
