import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTask$ = new BehaviorSubject<Itask[]>([]);
  private doneTask$ = new BehaviorSubject<Itask[]>([]);
  private doingTask$ = new BehaviorSubject<Itask[]>([]);

  readonly todoTasks = this.todoTask$.asObservable();

  readonly doingTasks = this.doingTask$.asObservable();

  readonly doneTasks = this.doneTask$.asObservable();
}
