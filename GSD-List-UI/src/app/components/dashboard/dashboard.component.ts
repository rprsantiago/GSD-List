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
  statuses: any;

  updateFlag = false;

  listStatusDescription: any = [];

  constructor(private taskService: TaskService,
    private codeTableService: CodetableService) { }

  ngOnInit(): void {
    this.Initialize();
  }

  Initialize() {
    //get tasks from the api
    this.taskService
      .getTasks()
      .subscribe((result: Task[]) => (this.tasks = result));

    this.codeTableService
      .getStatuses()
      .subscribe(result => {
        (this.statuses = result);

        console.log(this.statuses);

        this.statuses.forEach((element: codetable) => {
          this.listStatusDescription.push(element.statusDescription);
        }
        );

        this.handleUpdate();

      });


  }

  handleUpdate() {
    this.column.xAxis.categories = this.listStatusDescription;

    this.updateFlag = true;
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
      categories: this.listStatusDescription,
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
