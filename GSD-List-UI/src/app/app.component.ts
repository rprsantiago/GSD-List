import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GSD-List.UI';

  tasks: Task[] = [];

  displayedColumns: string[] = ['taskName', 'taskDescription'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));

      
  }

}
