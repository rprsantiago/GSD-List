import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { codetable } from 'src/app/models/codetable';
import { Task } from 'src/app/models/task';
import { CodetableService } from 'src/app/services/codetable.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  tasks: Task[] = [];
  statuses: codetable[] = [];

  listStatus: any = [];

  constructor(private taskService: TaskService,
    private codeTableService: CodetableService) { }

  ngOnInit(): void {
    this.Initialize();
  }

  Initialize(){
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));

    this.codeTableService
      .getStatuses()
      .subscribe((result: codetable[]) => this.statuses = result);
  }

  Highcharts = Highcharts;

  column: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Number of Tasks per Status'
    },
    xAxis: {
      categories: ['Not Yet Stared', 'Ongoing', 'Completed', 'Cancelled'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Tasks'
      }
    },
    series: [{
      name: 'Tasks',
      data: [2, 1, 1, 1]
    }]
  }
}
