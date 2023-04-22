import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { codetable } from 'src/app/models/codetable';

@Component({
  selector: 'app-modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.css']
})
export class ModalAddTaskComponent {

  taskForm!: FormGroup;
  isEditMode: boolean = false;
  taskData!: Task;
  listStatus: codetable[] = [];

  constructor(
    private dialogRef: MatDialogRef<ModalAddTaskComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { taskData: Task, listStatus: codetable[] }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.taskData ? true : false;
    this.taskData = this.data.taskData ? this.data.taskData : new Task();
    this.listStatus = this.data.listStatus;

    this.taskForm = this.formBuilder.group({
      id: [''],
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      status: ['']
    });

    if (this.isEditMode) {
      this.taskForm.patchValue(this.taskData);
      this.taskForm.controls['status'].setValue(this.taskData.statusId);
      
      this.taskForm.controls['status'].enable();
    }
    else{
      this.taskForm.controls['status'].setValue(1);
      this.taskForm.controls['status'].disable();
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
        statusId: this.taskForm.value.status
      };

      if (this.isEditMode) {
        task.id = this.taskData.id;
        task.dateUpdated = new Date();
        this.taskService.updateTask(task).subscribe(() => {
          this.dialogRef.close(task);
        });
      }
      else {
        task.statusId = 1;
        task.dateCreated = new Date();
        task.dateUpdated = new Date();

        this.taskService.saveTask(task).subscribe(() => {
          this.dialogRef.close(task);
        });
      }
    }
  }
}
