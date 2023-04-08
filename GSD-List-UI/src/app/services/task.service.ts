import { Injectable } from '@angular/core';
import { task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public getTasks(): task[]{
    let taskItem = new task();

    taskItem.id = 1;
    taskItem.taskName = "Task 1";
    taskItem.taskDescription = "Task 1 Description";
    taskItem.statusId = 1;

    return [taskItem];
  }
}
