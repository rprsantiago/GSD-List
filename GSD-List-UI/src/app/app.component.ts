import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalAddTaskComponent } from './components/modals/modal-add-task/modal-add-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmationComponent } from './components/modals/confirmation-modal/modal-confirmation/modal-confirmation.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GSD-List.UI';

  tasks: Task[] = [];

  displayedColumns: string[] = ['taskName', 'taskDescription', 'actions'];

  constructor(private taskService: TaskService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));
  }

  addNewTask() {
    const dialogRef = this.dialog.open(ModalAddTaskComponent, {
      width: '50%',
      height: '50%'
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
      height: '50%',
      data: task
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
