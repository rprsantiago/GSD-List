import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { codetable } from 'src/app/models/codetable';
import { Task } from 'src/app/models/task';
import { CodetableService } from 'src/app/services/codetable.service';
import { TaskService } from 'src/app/services/task.service';
import { ModalConfirmationComponent } from '../modals/confirmation-modal/modal-confirmation/modal-confirmation.component';
import { ModalAddTaskComponent } from '../modals/modal-add-task/modal-add-task.component';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks: Task[] = [];
  statuses: codetable[] = [];

  displayedColumns: string[] = ['taskName', 'taskDescription', 'statusDescription', 'actions'];

  constructor(private taskService: TaskService,
    private codeTableService: CodetableService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));

    this.codeTableService
      .getStatuses()
      .subscribe((result: codetable[]) => this.statuses = result);
  }

  addNewTask() {
    const dialogRef = this.dialog.open(ModalAddTaskComponent, {
      width: '50%',
      height: '57%',
      data: {
        taskData: null,
        listStatus: this.statuses
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Task added successfully', 'Close', {
          duration: 1000
        });

        this.ngOnInit();
      }
    });
  }

  editTask(task: any) {
    const dialogRef = this.dialog.open(ModalAddTaskComponent, {
      width: '50%',
      height: '57%',
      data: {
        taskData: task,
        listStatus: this.statuses
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Task updated successfully', 'Close', {
          duration: 1000
        });

        this.ngOnInit();
      }
    });
  }

  deleteTask(task: any) {

    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '50%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Task deleted successfully', 'Close', {
          duration: 1000
        });

        this.ngOnInit();
      }
    });
  }

}
