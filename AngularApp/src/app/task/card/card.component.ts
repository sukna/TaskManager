import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'task-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Output() deleteTask = new EventEmitter();

  constructor(private _dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {}

  edit(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['/task-edit', id]);
  }
  log(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['tasklog-form', id]);
  }

  delete(event: Event, id: number) {
    event.stopPropagation();
    this._dialogService
      .openDialog('Deleting task', 'Are you sure that you want to delete task?')
      .subscribe((confirmation) => {
        if (confirmation) {
          this.deleteTask.emit(id);
        }
      });
  }

  details(id: number) {
    this.router.navigate(['/task', id]);
  }
}
