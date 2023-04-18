import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.css']
})
export class ModalAddTaskComponent {
  taskForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalAddTaskComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }

  getErrorMessage(control: AbstractControl): string {
    // if control has no error
    if (!control.errors) {
      return '';
    }
    else {
      return 'This field is required';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        taskName: this.taskForm.value.taskName,
        taskDescription: this.taskForm.value.taskDescription,
        statusId: 1
      };

      this.taskService.saveTask(task).subscribe(() => {
        this.dialogRef.close(task);
      });
    }
  }
}
