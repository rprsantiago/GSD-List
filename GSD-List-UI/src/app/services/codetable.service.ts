import { Injectable } from '@angular/core';
import { codetable } from '../models/codetable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodetableService {
  private url = "status";

  constructor(private http: HttpClient) { }

  public getStatuses(): Observable<codetable[]> {
    return this.http.get<codetable[]>(`${environment.apiUrl}/${this.url}`);
  }
}
