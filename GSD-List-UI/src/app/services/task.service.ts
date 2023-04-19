import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = "task";

  constructor(
    //inject http client to make http requests to the api
    private http: HttpClient
  ) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/${this.url}`);
  }

  public saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/${this.url}`, task);
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/${this.url}`, task);
  }

  public deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
