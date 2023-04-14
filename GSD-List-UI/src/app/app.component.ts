import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalAddTaskComponent } from './components/modals/modal-add-task/modal-add-task.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GSD-List.UI';

  tasks: Task[] = [];

  displayedColumns: string[] = ['taskName', 'taskDescription'];

  constructor(private taskService: TaskService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAddTaskComponent, {
      width: '50%',
      height: '50%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

}
