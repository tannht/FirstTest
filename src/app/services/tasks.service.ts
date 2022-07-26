import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  api_url = 'https://62de506b79b9f8c30ab6ff6d.mockapi.io';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/tasks`);
  }
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.api_url}/tasks/${taskId}`);
  }
  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.api_url}/tasks/${taskId}`, task);
  }
  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.api_url}/tasks`, task);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/user`);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}/user/${userId}`);
  }
  getPrio(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/priority`);
  }
}
