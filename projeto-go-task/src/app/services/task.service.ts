import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTask$ = new BehaviorSubject<any[]>([]);
  private doneTask$ = new BehaviorSubject<any[]>([]);
  private doingTask$ = new BehaviorSubject<any[]>([]);

  readonly todoTasks = this.todoTask$.asObservable();

  readonly doingTasks = this.doingTask$.asObservable();

  readonly doneTasks = this.doneTask$.asObservable();
}
