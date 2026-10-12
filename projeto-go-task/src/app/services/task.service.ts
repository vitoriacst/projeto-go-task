import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { TaskStatusEnum } from '../enums';
import { ITaskFormControls } from '../interfaces';
import { Itask } from '../interfaces/task.interface';
import { taskStatus } from '../types/task.status';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamp';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTask$ = new BehaviorSubject<Itask[]>([]);
  private doneTask$ = new BehaviorSubject<Itask[]>([]);
  private doingTask$ = new BehaviorSubject<Itask[]>([]);

  readonly todoTasks = this.todoTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  readonly doingTasks = this.doingTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  readonly doneTasks = this.doneTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  addTask(taskInfos: ITaskFormControls) {
    const newTask: Itask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    this.todoTask$.next([...this.todoTask$.value, newTask]);
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: taskStatus,
    taskNextStatus: taskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  private getTaskListByStatus(taskStatus: taskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTask$,
      [TaskStatusEnum.DOING]: this.doingTask$,
      [TaskStatusEnum.DONE]: this.doneTask$,
    };

    return taskListObj[taskStatus];
  }
}
