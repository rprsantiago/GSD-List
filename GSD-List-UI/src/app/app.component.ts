import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { CodetableService } from './services/codetable.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalAddTaskComponent } from './components/modals/modal-add-task/modal-add-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmationComponent } from './components/modals/confirmation-modal/modal-confirmation/modal-confirmation.component';
import { codetable } from './models/codetable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GSD-List.UI';
  
  constructor() { }

  ngOnInit(): void {

  }
}
