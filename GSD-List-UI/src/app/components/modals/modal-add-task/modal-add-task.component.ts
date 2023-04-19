import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalAddTaskComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data ? true : false;

    this.taskForm = this.formBuilder.group({
      id: [''],
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.taskForm.patchValue(this.data);
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

      if (this.isEditMode) {
        task.id = this.data.id;
        this.taskService.updateTask(task).subscribe(() => {
          this.dialogRef.close(task);
        });
      }
      else {
        this.taskService.saveTask(task).subscribe(() => {
          this.dialogRef.close(task);
        });
      }
    }
  }
}
